import { Component, ViewChild, ElementRef, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonContent } from '@ionic/angular';
import { Router } from '@angular/router'; // Import Router
import { AiService } from '../ai.service';
import { AuthService } from '../auth.service';
import { DatabaseService } from '../database.service';
import { CaseService } from '../case.service';
import { AnnouncementService } from '../admin/services/announcement.service'; // Import AnnouncementService
import { ChatMessage } from '../schemas';
import { SYSTEM_PROMPT_COMPLAINTS_ASSISTANT, SYSTEM_PROMPT_LOGIN_ASSISTANT, SYSTEM_PROMPT_FOLLOWUP_ASSISTANT } from '../prompts';
import { firstValueFrom } from 'rxjs'; // New import

const MAX_TEXTAREA_HEIGHT = 150;
const ADMIN_AI_DISABLE_DURATION_MINUTES = 10;

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'analytics-agent';

  @ViewChild('chatContainer', { static: false }) private chatContainer!: IonContent;
  @ViewChild('messageInput') private messageInput!: ElementRef;

  public messages: ChatMessage[] = [];
  private systemPrompt: ChatMessage;
  public newMessage: string = '';
  public isLoading: boolean = false;
  public currentStatusMessage: string = 'Typing...';
  public userId: string | null = null;
  public agencyId: string | null = null;
  public employeeMemories: string[] = [];
  public announcements: string[] = []; // New: Stores active announcement messages
  public showAnnouncementBanner: boolean = true; // New: Controls announcement banner visibility
  public aiEnabledUntil: Date | null = null; // New property
  private complaintCheckInterval: any; // Property to hold the interval ID for chat history refresh
  private mainStatusMonitorInterval: any; // New property to hold the main status monitor interval ID
  private complaintStatusActive: boolean = false; // New property to track complaint status
  private initialScrollDone: boolean = false; // New property to track initial scroll
  private clickCount: number = 0; // New: Click counter for admin redirect
  private lastClickTime: number = 0; // New: Timestamp of last click for admin redirect

  constructor(
    private aiService: AiService,
    private authService: AuthService,
    private databaseService: DatabaseService,
    private caseService: CaseService,
    private announcementService: AnnouncementService, // Inject AnnouncementService
    private cdRef: ChangeDetectorRef, // Inject ChangeDetectorRef
    private router: Router // Inject Router
  ) {
    this.systemPrompt = {
      role: 'system',
      content: ''
    };
  }

  async ngOnInit(): Promise<void> { // Made ngOnInit async
    let userId = localStorage.getItem('user_id');
    let agencyId = localStorage.getItem('agency_id');

    if ((userId && (!agencyId || agencyId === 'null' || agencyId === 'undefined')) || (!userId && agencyId)) {
      this.authService.logout();
      userId = null;
      agencyId = null;
    }

    this.userId = userId;
    this.agencyId = agencyId;

    this.setInitialSystemPrompt();

    if (this.userId) {
      // Load everything sequentially to avoid race conditions
      await this.loadAiEnabledUntilStatus();
      await this.loadChatHistory();
      await this.loadEmployeeMemories();
      this.startMainStatusMonitoring();
    } else {
      this.messages = [];
      this.messages.push({ role: 'assistant', content: 'Welcome! To get started, please provide your last name and passport number so I can assist you.' });
    }

    // Load active announcements
    try {
      this.announcements = await this.announcementService.getActiveAnnouncements();
    } catch (error) {
      console.error('Error loading announcements:', error);
    }
  }

  ngAfterViewInit(): void {
    // Ensure the chatContainer is available before attempting to scroll
    if (this.chatContainer && !this.initialScrollDone) {
      this.scrollToBottom();
      this.initialScrollDone = true;
      // Manually trigger change detection if the content was loaded asynchronously
      // and the scroll might not immediately reflect in the view.
      this.cdRef.detectChanges();
    }
  }

  ngOnDestroy(): void {
    this.stopMainStatusMonitoring();
    this.stopChatRefreshInterval();
  }

  private startMainStatusMonitoring(): void {
    if (this.userId && !this.mainStatusMonitorInterval && !this.complaintStatusActive) {
      // Initial check (non-async to avoid blocking ngOnInit or subsequent calls if the interval starts immediately)
      this.checkAndSetComplaintStatus();
      this.mainStatusMonitorInterval = setInterval(() => {
        // Only fetch main status if not currently in a complaint active state
        if (!this.complaintStatusActive) {
          this.checkAndSetComplaintStatus();
        }
      }, 5000); // Check main status every 5 seconds
    }
  }

  private stopMainStatusMonitoring(): void {
    if (this.mainStatusMonitorInterval) {
      clearInterval(this.mainStatusMonitorInterval);
      this.mainStatusMonitorInterval = null;
    }
  }

  private async checkAndSetComplaintStatus(): Promise<void> {
    if (this.userId) {
      try {
        const mainStatus = await firstValueFrom(this.databaseService.getApplicantMainStatus(parseInt(this.userId, 10)));
        const hasComplaint = mainStatus && mainStatus.toLowerCase().includes('complain');

        if (hasComplaint && !this.complaintStatusActive) {
          this.complaintStatusActive = true;
          this.startChatRefreshInterval();
          this.stopMainStatusMonitoring(); // Stop frequent main status checks if complaint is active
        } else if (!hasComplaint && this.complaintStatusActive) {
          this.complaintStatusActive = false;
          this.stopChatRefreshInterval();
          this.startMainStatusMonitoring(); // Restart frequent main status checks if complaint is resolved
        }
        // If hasComplaint and complaintStatusActive are both true, do nothing, the 10s interval handles it
        // If !hasComplaint and !complaintStatusActive, do nothing, mainStatusMonitorInterval will continue
      } catch (error) {
        console.error('Error checking applicant main status:', error);
      }
    }
  }

  private startChatRefreshInterval(): void {
    this.stopChatRefreshInterval(); // Ensure any existing interval is cleared
    if (this.userId) {
      this.complaintCheckInterval = setInterval(() => {
        this.loadChatHistory(); // DB Call 2 (getChatHistory)
        this.loadEmployeeMemories(); // DB Call 3 (getEmployeeMemories)
      }, 10000); // 10 seconds
    }
  }

  private stopChatRefreshInterval(): void {
    if (this.complaintCheckInterval) {
      clearInterval(this.complaintCheckInterval);
      this.complaintCheckInterval = null;
    }
  }

  private async loadAiEnabledUntilStatus(): Promise<void> {
    if (this.userId) {
      try {
        const timestamp = await firstValueFrom(this.databaseService.getApplicantAiEnabledUntil(parseInt(this.userId, 10)));
        if (timestamp) {
          this.aiEnabledUntil = new Date(timestamp);
        } else {
          this.aiEnabledUntil = null;
        }
      } catch (error) {
        console.error('Error loading AI enabled until status:', error);
        this.aiEnabledUntil = null;
      }
    }
  }

  public dismissAnnouncementBanner(): void {
    this.showAnnouncementBanner = false;
  }

  private setInitialSystemPrompt(): void {
    if (this.userId) {
      this.systemPrompt.content = SYSTEM_PROMPT_COMPLAINTS_ASSISTANT;
    } else {
      this.systemPrompt.content = SYSTEM_PROMPT_LOGIN_ASSISTANT + '\n\n' + SYSTEM_PROMPT_COMPLAINTS_ASSISTANT;
    }
  }

  private async loadChatHistory(): Promise<void> {
    if (!this.userId) {
      return;
    }
    try {
      const history = await firstValueFrom(this.databaseService.getChatHistory(parseInt(this.userId, 10)));
      
      // Manually process history for [[ADMIN]] tags to set aiEnabledUntil
      this.updateAiEnabledUntilFromHistory(history);
      
      // Assign history directly. The `content` property of each message will remain raw (with tags).
      // The `processMessageContent` function will be called in the template for display.
      this.messages = history;
      
      this.cdRef.detectChanges(); // Force change detection to ensure content is rendered before scroll
      this.scrollToBottom(); // Always scroll to bottom after loading history
    } catch (error) {
      console.error('Failed to load chat history:', error);
      this.messages.push({ role: 'assistant', content: 'Sorry, I was unable to load your previous conversation.' });
      this.cdRef.detectChanges();
      this.scrollToBottom();
    }
  }

  private loadEmployeeMemories(): void {
    if (this.userId) {
      this.databaseService.getEmployeeMemories(parseInt(this.userId, 10)).subscribe({
        next: (memories) => {
          this.employeeMemories = memories;
        },
        error: (error) => {
          console.error('Failed to load employee memories:', error);
        }
      });
    }
  }

  // ngAfterViewChecked(): void {
  //   // this.scrollToBottom(); // Removed for more controlled scrolling
  // }

  public adjustTextareaHeight(): void {
    if (this.messageInput && this.messageInput.nativeElement) {
      const element = this.messageInput.nativeElement;
      element.style.height = 'auto';
      element.style.height = Math.min(element.scrollHeight, MAX_TEXTAREA_HEIGHT) + 'px';
      element.style.overflowY = element.scrollHeight > MAX_TEXTAREA_HEIGHT ? 'auto' : 'hidden';
    }
  }

  sendMessage(): void {
    if (this.newMessage.trim() === '') {
      return;
    }

    this.isLoading = true;
    this.currentStatusMessage = 'Typing...';
    this.scrollToBottom();

    const userMessage: ChatMessage = { role: 'user', content: this.newMessage.trim() };

    this.messages.push(userMessage);
    this.saveMessageToDb(userMessage);

    this.newMessage = '';

    let callAiService = true; // Flag to determine if AI should be called

    // Check if AI is temporarily disabled (from historical messages or direct admin message)
    if (this.aiEnabledUntil && this.aiEnabledUntil.getTime() > new Date().getTime()) {
      callAiService = false; // Do not call AI service
    }

    // Debug log for [[ADMIN]] tag detection
    console.log('sendMessage: Checking user message for [[ADMIN]] tag.');
    console.log('sendMessage: userMessage.content:', userMessage.content);
    console.log('sendMessage: userMessage.content.includes("[[ADMIN]]"):', userMessage.content.includes('[[ADMIN]]'));

    // Check for ADMIN tag in the current message being sent by the user (admin)
    // This part still needs to prevent AI response and set disablement.
    if (userMessage.content.includes('[[ADMIN]]')) {
        const newAiEnabledUntil = new Date(new Date().getTime() + ADMIN_AI_DISABLE_DURATION_MINUTES * 60 * 1000);
        if (!this.aiEnabledUntil || newAiEnabledUntil.getTime() > this.aiEnabledUntil.getTime()) {
            this.aiEnabledUntil = newAiEnabledUntil;
            if (this.userId) {
                this.databaseService.saveApplicantAiEnabledUntil(parseInt(this.userId, 10), this.aiEnabledUntil).subscribe({
                    next: () => {},
                    error: (err) => console.error('sendMessage - Failed to save AI enabled until status:', err)
                });
            }
        }
        callAiService = false; // Explicitly do not call AI if admin sends [[ADMIN]]
    }

    if (callAiService) {
      let currentSystemPromptContent = this.systemPrompt.content;

      if (this.userId && this.employeeMemories && this.employeeMemories.length > 0) {
        const memoriesString = this.employeeMemories.map(memory => `"${memory}"`).join(', ');
        currentSystemPromptContent += `\n\nUser's known characteristics: ${memoriesString}`;
      }

      const systemPromptForAi: ChatMessage = { role: 'system', content: currentSystemPromptContent };

      const historyForAi = this.messages.slice(-10);
      const aiPayload: ChatMessage[] = [systemPromptForAi, ...historyForAi];

      // Pass employeeId to aiService.callAi
      const employeeIdNum = this.userId ? parseInt(this.userId, 10) : null;
      this.aiService.callAi(aiPayload, employeeIdNum).subscribe({
        next: (response: string) => {
          // If response is empty, it means AI was disabled by backend check (though now frontend handles it primarily)
          if (!response) {
              this.isLoading = false;
              this.currentStatusMessage = '';
              // No disabled message needed here, just skip AI response
              this.scrollToBottom();
              return;
          }

          const { response: processedResponse, tagProcessed } = this.parseAiResponseForTags(response);
          let assistantMessage: ChatMessage | null = null;
          if (processedResponse) {
            assistantMessage = { role: 'assistant', content: processedResponse };
            // Process the message to strip any tags before displaying
            this.messages.push(assistantMessage);
            this.saveMessageToDb(assistantMessage);
          }

          this.isLoading = false;
          this.currentStatusMessage = '';

          if (assistantMessage) {
            this.triggerFollowUpAi(userMessage, assistantMessage);
          }
          this.scrollToBottom(); // Explicit scroll after AI response
        },
        error: (error) => {
          console.error('AI call failed:', error);
          const errorMessage: ChatMessage = { role: 'assistant', content: 'Error: Could not get a response from the AI.' };
          this.messages.push(errorMessage);
          this.saveMessageToDb(errorMessage);
          this.isLoading = false;
          this.currentStatusMessage = '';
          this.scrollToBottom(); // Explicit scroll after error message
        }
      });
    } else {
      this.isLoading = false;
      this.currentStatusMessage = '';
      this.scrollToBottom(); // Just scroll to bottom after user's message
    }
    this.adjustTextareaHeight();
  }
  private saveMessageToDb(message: ChatMessage): void {
    if (this.userId && this.agencyId && this.agencyId !== 'null' && this.agencyId !== 'undefined') {
      this.databaseService.saveChatMessage(message, parseInt(this.userId, 10), parseInt(this.agencyId, 10)).subscribe({
        next: () => {},
        error: (err) => console.error('Failed to save message:', err)
      });
    }
  }

  private updateAiEnabledUntilFromHistory(history: ChatMessage[]): void {
    if (!this.userId) return;

    const currentCheckTime = new Date(); // Get 'now' once for consistency

    let latestDisablementFromHistory: Date | null = null;
    
    for (const message of history) {
      if (message.content.includes('[[ADMIN]]') && message.timestamp) {
        const messageDate = new Date(message.timestamp.replace(' ', 'T'));
        const timeDiffMinutes = (currentCheckTime.getTime() - messageDate.getTime()) / (1000 * 60);

        // A message is "less than 10 minutes old" if it's not in the future and not more than 10 minutes in the past.
        if (timeDiffMinutes >= 0 && timeDiffMinutes <= ADMIN_AI_DISABLE_DURATION_MINUTES) {
          const newAiEnabledUntilCandidate = new Date(currentCheckTime.getTime() + ADMIN_AI_DISABLE_DURATION_MINUTES * 60 * 1000); // Calculate from 'currentCheckTime'
          if (!latestDisablementFromHistory || newAiEnabledUntilCandidate.getTime() > latestDisablementFromHistory.getTime()) {
            latestDisablementFromHistory = newAiEnabledUntilCandidate;
          }
        }
      }
    }

    // Determine the *new effective* AI disablement time for the component.
    // It's the latest of:
    // 1. What's currently in this.aiEnabledUntil
    // 2. What we just calculated from the history.
    let newEffectiveAiEnabledUntil: Date | null = this.aiEnabledUntil; 

    if (latestDisablementFromHistory && (!newEffectiveAiEnabledUntil || latestDisablementFromHistory.getTime() > newEffectiveAiEnabledUntil.getTime())) {
      newEffectiveAiEnabledUntil = latestDisablementFromHistory;
    }

    // If newEffectiveAiEnabledUntil is in the past, nullify it.
    if (newEffectiveAiEnabledUntil && newEffectiveAiEnabledUntil.getTime() < currentCheckTime.getTime()) {
      newEffectiveAiEnabledUntil = null;
    }
    
    // Check if the component's state actually needs to change.
    const hasChanged = (!this.aiEnabledUntil && newEffectiveAiEnabledUntil) || // Was null, now has a value
                       (this.aiEnabledUntil && !newEffectiveAiEnabledUntil) || // Had a value, now is null
                       (this.aiEnabledUntil && newEffectiveAiEnabledUntil && this.aiEnabledUntil.getTime() !== newEffectiveAiEnabledUntil.getTime());

    // Update the component's state
    this.aiEnabledUntil = newEffectiveAiEnabledUntil;

    // Update the component's state
    this.aiEnabledUntil = newEffectiveAiEnabledUntil;

    if (hasChanged) { // Only update DB if the in-memory state actually changed
      this.databaseService.saveApplicantAiEnabledUntil(parseInt(this.userId, 10), this.aiEnabledUntil).subscribe({
        next: () => {},
        error: (err) => console.error('updateAiEnabledUntilFromHistory - Failed to save AI enabled until status:', err)
      });
    }
  }

  // This function now takes the raw message content string and returns a cleaned string
  // with action tags completely removed, suitable for display.
  public processMessageContent(content: string): string { // Changed from private to public
    let cleanedContent = content;

    // Remove ADMIN tag
    cleanedContent = cleanedContent.replace(/\[\[ADMIN\]\]/g, '');
    // Remove MEMORY tag
    cleanedContent = cleanedContent.replace(/\[\[MEMORY:"([^"]+)"\]\]/g, '');
    // Remove REPORT tag
    cleanedContent = cleanedContent.replace(/\[\[REPORT\]\]/g, '');

    return cleanedContent.trim();
  }

    private parseAiResponseForTags(response: string): { response: string, tagProcessed: boolean } {
      const loginTagRegex = /\[\[LOGIN, LASTNAME:"([^"]+)",PASSPORT:"([^"]+)"\]\]/;
      const memoryTagRegex = /\[\[MEMORY:"([^"]+)"\]\]/g;
      const reportTagRegex = /\[\[REPORT\]\]/;
  
      let modifiedResponse = response;
      let tagProcessed = false;
  
      // 1. Process LOGIN tag
      const loginMatch = modifiedResponse.match(loginTagRegex);
      if (loginMatch) {
        const lastName = loginMatch[1];
        const passportNumber = loginMatch[2];
        this.authService.login(lastName, passportNumber).subscribe({
          next: (success) => {
            if (success) {
              this.userId = localStorage.getItem('user_id');
              this.agencyId = localStorage.getItem('agency_id');
              this.setInitialSystemPrompt();
              this.messages = [];
              this.loadChatHistory();
              this.loadEmployeeMemories();
            } else {
              const loginFailMessage: ChatMessage = { role: 'assistant', content: 'Account does not exist, please double check if input is correct.' };
              this.messages.push(loginFailMessage);
              this.saveMessageToDb(loginFailMessage);
              this.scrollToBottom(); // Explicit scroll after login fail message
            }
          },
          error: (error) => {
            console.error('Login failed:', error);
            const loginErrorMessage: ChatMessage = { role: 'assistant', content: 'An error occurred during login. Please try again later.' };
            this.messages.push(loginErrorMessage);
            this.saveMessageToDb(loginErrorMessage);
            this.scrollToBottom(); // Explicit scroll after login error message
          }
        });
        modifiedResponse = modifiedResponse.replace(loginTagRegex, '').trim();
        tagProcessed = true;
      }
  
      // 2. Process MEMORY tags
      const memoryMatches = [...modifiedResponse.matchAll(memoryTagRegex)];
      for (const memoryMatch of memoryMatches) {
        const memoryContent = memoryMatch[1];
        if (this.userId) {
          this.databaseService.saveEmployeeMemory(parseInt(this.userId, 10), memoryContent)
            .subscribe({
              next: () => {
                this.employeeMemories.push(memoryContent);
              },
              error: (err) => console.error('Failed to save memory:', err)
            });
        }
        tagProcessed = true;
      }
      modifiedResponse = modifiedResponse.replace(memoryTagRegex, '').trim();
  
      // 3. Process REPORT tag
      const reportMatch = modifiedResponse.match(reportTagRegex);
      if (reportMatch) {
        tagProcessed = true;
        modifiedResponse = modifiedResponse.replace(reportTagRegex, '').trim();
        if (this.userId) {
          this.handleReportTag();
        } else {
          const unauthReportMessage: ChatMessage = { role: 'assistant', content: 'Please log in to file a report.' };
          this.messages.push(unauthReportMessage);
          this.saveMessageToDb(unauthReportMessage);
          this.scrollToBottom(); // Explicit scroll after unauth report message
        }
      }
  
      return {
        response: modifiedResponse,
        tagProcessed: tagProcessed
      };
    }
  private handleReportTag(): void {
    if (!this.userId || !this.agencyId) {
      return;
    }

    this.isLoading = true;
    this.currentStatusMessage = "I've noticed you're describing a serious issue. I'm starting the process to file a formal report for you.";
    this.scrollToBottom(); // Scroll when status message changes

    const onStatusUpdate = (message: string) => {
      this.currentStatusMessage = message;
      this.scrollToBottom();
    };

    const historyForReport = this.messages.slice(-10);

    this.caseService.handleReportCreation(parseInt(this.userId, 10), parseInt(this.agencyId, 10), historyForReport, onStatusUpdate).subscribe({
      next: (caseId) => {
        this.isLoading = false;
        this.currentStatusMessage = '';
        this.scrollToBottom(); // Scroll after report process completed
      },
      error: (error) => {
        console.error('Error during report processing:', error);
        this.currentStatusMessage = "An unexpected error occurred during report processing. Please try again.";
        this.isLoading = false;
        this.scrollToBottom(); // Scroll after report error
      }
    });
  }

  private triggerFollowUpAi(userMessage: ChatMessage, assistantMessage: ChatMessage): void {
    let currentSystemPromptContent = this.systemPrompt.content;
    if (this.userId && this.employeeMemories && this.employeeMemories.length > 0) {
      const memoriesString = this.employeeMemories.map(memory => `"${memory}"`).join(', ');
      currentSystemPromptContent += `\n\nUser's known characteristics: ${memoriesString}`;
    }
    currentSystemPromptContent += `\n\n${SYSTEM_PROMPT_FOLLOWUP_ASSISTANT}`;
    const systemPromptForAi: ChatMessage = { role: 'system', content: currentSystemPromptContent };

    const historyForAi = this.messages.slice(-10);
    const followUpPayload: ChatMessage[] = [systemPromptForAi, ...historyForAi];

    const employeeIdNum = this.userId ? parseInt(this.userId, 10) : null;
    this.aiService.callAi(followUpPayload, employeeIdNum).subscribe({
      next: (response: string) => {
        // If response is empty, it means AI was disabled by backend check (though now frontend handles it primarily)
        if (!response) {
            return;
        }

        const doneTagRegex = /\[\[DONE\]\]/;
        const doneMatch = response.match(doneTagRegex);

        if (!doneMatch) { // If doneMatch is NOT found, then it's a corrective message
          const followUpMessage: ChatMessage = { role: 'assistant', content: response.trim() };
          this.messages.push(followUpMessage);
          this.saveMessageToDb(followUpMessage);
          this.scrollToBottom(); // Explicit scroll after follow-up message
        }
      },
      error: (error) => {
        console.error('Follow-up AI call failed:', error);
        this.scrollToBottom(); // Explicit scroll after follow-up error
      }
    });
  }

  private scrollToBottom(): void {
    if (this.chatContainer) {
      this.chatContainer.scrollToBottom(50);
    }
  }

  // New method to handle clicks on the ion-title for admin redirection
  public onTitleClick(): void {
    const currentTime = Date.now();
    const clickThreshold = 500; // milliseconds

    if (currentTime - this.lastClickTime < clickThreshold) {
      this.clickCount++;
    } else {
      this.clickCount = 1;
    }

    this.lastClickTime = currentTime;

    if (this.clickCount === 3) {
      this.router.navigate(['/admin']);
      this.clickCount = 0; // Reset after redirection
    }
  }
}