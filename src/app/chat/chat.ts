import { Component, ViewChild, ElementRef, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
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

  @ViewChild('chatContainer') private chatContainer!: ElementRef;
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

  constructor(
    private aiService: AiService,
    private authService: AuthService,
    private databaseService: DatabaseService,
    private caseService: CaseService,
    private announcementService: AnnouncementService, // Inject AnnouncementService
    private cdRef: ChangeDetectorRef // Inject ChangeDetectorRef
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
      console.log('ChatComponent: User unauthenticated. Pushing welcome message. Initial scroll will be handled by ngAfterViewInit.');
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
      console.log('ngAfterViewInit: Performing initial scroll to bottom.');
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
      console.log('Starting main status monitoring interval.');
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
      console.log('Stopping main status monitoring interval.');
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
          console.log('Applicant now has a complaint. Activating chat history refresh.');
          this.complaintStatusActive = true;
          this.startChatRefreshInterval();
          this.stopMainStatusMonitoring(); // Stop frequent main status checks if complaint is active
        } else if (!hasComplaint && this.complaintStatusActive) {
          console.log('Applicant no longer has a complaint. Deactivating chat history refresh.');
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
        console.log('Refreshing chat history due to complaint status.');
        this.loadChatHistory(); // DB Call 2 (getChatHistory)
        this.loadEmployeeMemories(); // DB Call 3 (getEmployeeMemories)
      }, 10000); // 10 seconds
    }
  }

  private stopChatRefreshInterval(): void {
    if (this.complaintCheckInterval) {
      console.log('Stopping chat history refresh interval.');
      clearInterval(this.complaintCheckInterval);
      this.complaintCheckInterval = null;
    }
  }

  private async loadAiEnabledUntilStatus(): Promise<void> {
    if (this.userId) {
      try {
        const timestamp = await firstValueFrom(this.databaseService.getApplicantAiEnabledUntil(parseInt(this.userId, 10)));
        console.log('loadAiEnabledUntilStatus - Fetched timestamp from DB:', timestamp);
        if (timestamp) {
          this.aiEnabledUntil = new Date(timestamp);
          console.log('loadAiEnabledUntilStatus - AI enabled until:', this.aiEnabledUntil);
        } else {
          this.aiEnabledUntil = null;
          console.log('loadAiEnabledUntilStatus - AI enabled until: null (no timestamp in DB)');
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
      
      // Then, map the messages for display, which will now only strip tags
      this.messages = history.map(msg => this.processMessageContent(msg));
      
      console.log('ChatComponent: Chat history loaded. Explicitly detecting changes and scrolling to bottom.');
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
          console.log('Loaded employee memories:', this.employeeMemories);
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
    console.log('sendMessage called. Current aiEnabledUntil:', this.aiEnabledUntil);
    if (this.newMessage.trim() === '') {
      console.log('New message is empty, returning.');
      return;
    }

    // Check if AI is temporarily disabled
    if (this.aiEnabledUntil && this.aiEnabledUntil.getTime() > new Date().getTime()) {
      console.log('sendMessage - AI is currently disabled until:', this.aiEnabledUntil);
      const disabledMessage: ChatMessage = { role: 'assistant', content: "Our team is currently reviewing your case. AI responses are temporarily paused. Please await a direct response from our support staff." };
      this.messages.push(disabledMessage);
      this.saveMessageToDb(disabledMessage);
      this.newMessage = '';
      this.adjustTextareaHeight();
      setTimeout(() => this.scrollToBottom(), 0); // Explicit scroll after message
      return;
    }

    this.isLoading = true;
    this.currentStatusMessage = 'Typing...';
    setTimeout(() => {
      this.scrollToBottom();
    }, 0);

    const userMessage: ChatMessage = { role: 'user', content: this.newMessage.trim() };

    this.messages.push(userMessage);
    this.saveMessageToDb(userMessage);

    this.newMessage = '';

    // Check for ADMIN tag in the current message being sent by the user (admin)
    if (userMessage.content.includes('[[ADMIN]]')) {
        console.log('Admin message with [[ADMIN]] tag detected. Skipping AI response.');
        // Set AI to be disabled for a period, similar to how it's done for historical messages
        const newAiEnabledUntil = new Date(new Date().getTime() + ADMIN_AI_DISABLE_DURATION_MINUTES * 60 * 1000);
        if (!this.aiEnabledUntil || newAiEnabledUntil > this.aiEnabledUntil) {
            this.aiEnabledUntil = newAiEnabledUntil;
            console.log(`sendMessage - AI disabled until ${this.aiEnabledUntil} due to direct admin message.`);
            // Persist the updated aiEnabledUntil status
            if (this.userId) {
                this.databaseService.saveApplicantAiEnabledUntil(parseInt(this.userId, 10), this.aiEnabledUntil).subscribe({
                    next: () => console.log('sendMessage - AI enabled until status saved to DB.'),
                    error: (err) => console.error('sendMessage - Failed to save AI enabled until status:', err)
                });
            }
        }
        this.isLoading = false;
        this.currentStatusMessage = '';
        this.adjustTextareaHeight();
        setTimeout(() => this.scrollToBottom(), 0);
        return; // Skip AI call entirely
    }

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
    console.log('Calling initial AI with payload:', aiPayload, 'and employeeId:', employeeIdNum);
    this.aiService.callAi(aiPayload, employeeIdNum).subscribe({
      next: (response: string) => {
        console.log('Initial AI response received:', response);
        // If response is empty, it means AI was disabled by backend check (though now frontend handles it primarily)
        if (!response) {
            this.isLoading = false;
            this.currentStatusMessage = '';
            const noAiMessage: ChatMessage = { role: 'assistant', content: "Our team is currently reviewing your case. AI responses are temporarily paused. Please await a direct response from our support staff." };
            this.messages.push(noAiMessage);
            this.saveMessageToDb(noAiMessage);
            this.scrollToBottom();
            return;
        }

        const { response: processedResponse, tagProcessed } = this.parseAiResponseForTags(response);
        let assistantMessage: ChatMessage | null = null;
        if (processedResponse) {
          assistantMessage = { role: 'assistant', content: processedResponse };
          // Process the message to strip any tags before displaying
          this.messages.push(this.processMessageContent(assistantMessage));
          this.saveMessageToDb(assistantMessage);
          console.log('Assistant message added:', assistantMessage);
        }

        this.isLoading = false;
        this.currentStatusMessage = '';

        if (assistantMessage) {
          console.log('Triggering follow-up AI.');
          this.triggerFollowUpAi(userMessage, assistantMessage);
        }
        setTimeout(() => this.scrollToBottom(), 0); // Explicit scroll after AI response
      },
      error: (error) => {
        console.error('AI call failed:', error);
        const errorMessage: ChatMessage = { role: 'assistant', content: 'Error: Could not get a response from the AI.' };
        this.messages.push(errorMessage);
        this.saveMessageToDb(errorMessage);
        this.isLoading = false;
        this.currentStatusMessage = '';
        setTimeout(() => this.scrollToBottom(), 0); // Explicit scroll after error message
      }
    });
    this.adjustTextareaHeight();
  }

  private saveMessageToDb(message: ChatMessage): void {
    console.log('Attempting to save message. UserID:', this.userId, 'AgencyID:', this.agencyId);
    if (this.userId && this.agencyId && this.agencyId !== 'null' && this.agencyId !== 'undefined') {
      console.log('UserID and AgencyID are present. Calling database service.');
      this.databaseService.saveChatMessage(message, parseInt(this.userId, 10), parseInt(this.agencyId, 10)).subscribe({
        next: () => console.log('Message saved successfully.'),
        error: (err) => console.error('Failed to save message:', err)
      });
    } else {
      console.log('Save skipped: UserID or AgencyID is missing or invalid.');
    }
  }

  private updateAiEnabledUntilFromHistory(history: ChatMessage[]): void {
    if (!this.userId) return;

    let latestDisablementTime: Date | null = this.aiEnabledUntil;
    
    for (const message of history) {
      if (message.content.includes('[[ADMIN]]') && message.timestamp) {
        const messageDate = new Date(message.timestamp.replace(' ', 'T'));
        const now = new Date();
        const timeDiffMinutes = (now.getTime() - messageDate.getTime()) / (1000 * 60);

        if (timeDiffMinutes < ADMIN_AI_DISABLE_DURATION_MINUTES) {
          const newAiEnabledUntil = new Date(messageDate.getTime() + ADMIN_AI_DISABLE_DURATION_MINUTES * 60 * 1000);
          if (!latestDisablementTime || newAiEnabledUntil > latestDisablementTime) {
            latestDisablementTime = newAiEnabledUntil;
          }
        }
      }
    }

    const needsDbUpdate = (latestDisablementTime && !this.aiEnabledUntil) || 
                          (latestDisablementTime && this.aiEnabledUntil && latestDisablementTime.getTime() !== this.aiEnabledUntil.getTime());

    this.aiEnabledUntil = latestDisablementTime;

    if (needsDbUpdate) {
      console.log(`updateAiEnabledUntilFromHistory - A new disablement time was found. Updating AI disabled until ${this.aiEnabledUntil}`);
      this.databaseService.saveApplicantAiEnabledUntil(parseInt(this.userId, 10), this.aiEnabledUntil).subscribe({
        next: () => console.log('updateAiEnabledUntilFromHistory - AI enabled until status saved to DB.'),
        error: (err) => console.error('updateAiEnabledUntilFromHistory - Failed to save AI enabled until status:', err)
      });
    }
  }

  private processMessageContent(message: ChatMessage): ChatMessage {
    const adminTagRegex = /\[\[ADMIN\]\]/g;
    let cleanedContent = message.content;

    // This logic is now handled by updateAiEnabledUntilFromHistory
    // All that's left is to strip the tags for display.

    cleanedContent = cleanedContent.replace(adminTagRegex, '').trim();
    cleanedContent = cleanedContent.replace(/\[\[MEMORY:"([^"]+)"\]\]/g, '').trim();
    cleanedContent = cleanedContent.replace(/\[\[REPORT\]\]/g, '').trim();

    // Return a new message object with the cleaned content
    return {
      ...message,
      content: cleanedContent
    };
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
              setTimeout(() => this.scrollToBottom(), 0); // Explicit scroll after login fail message
            }
          },
          error: (error) => {
            console.error('Login failed:', error);
            const loginErrorMessage: ChatMessage = { role: 'assistant', content: 'An error occurred during login. Please try again later.' };
            this.messages.push(loginErrorMessage);
            this.saveMessageToDb(loginErrorMessage);
            setTimeout(() => this.scrollToBottom(), 0); // Explicit scroll after login error message
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
                console.log('Memory saved successfully: ', memoryContent);
                this.employeeMemories.push(memoryContent);
              },
              error: (err) => console.error('Failed to save memory:', err)
            });
        } else {
          console.warn('Attempted to save memory for unauthenticated user:', memoryContent);
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
          console.warn('[[REPORT]] tag detected for unauthenticated user. Ignoring.');
          const unauthReportMessage: ChatMessage = { role: 'assistant', content: 'Please log in to file a report.' };
          this.messages.push(unauthReportMessage);
          this.saveMessageToDb(unauthReportMessage);
          setTimeout(() => this.scrollToBottom(), 0); // Explicit scroll after unauth report message
        }
      }
  
      return {
        response: modifiedResponse,
        tagProcessed: tagProcessed
      };
    }
  private handleReportTag(): void {
    if (!this.userId || !this.agencyId) {
      console.error('handleReportTag called without a valid userId or agencyId.');
      return;
    }

    this.isLoading = true;
    this.currentStatusMessage = "I've noticed you're describing a serious issue. I'm starting the process to file a formal report for you.";
    setTimeout(() => this.scrollToBottom(), 0); // Scroll when status message changes

    const onStatusUpdate = (message: string) => {
      this.currentStatusMessage = message;
      this.scrollToBottom();
    };

    const historyForReport = this.messages.slice(-10);

    this.caseService.handleReportCreation(parseInt(this.userId, 10), parseInt(this.agencyId, 10), historyForReport, onStatusUpdate).subscribe({
      next: (caseId) => {
        console.log(`Report process completed. Case ID: ${caseId}`);
        this.isLoading = false;
        this.currentStatusMessage = '';
        setTimeout(() => this.scrollToBottom(), 0); // Scroll after report process completed
      },
      error: (error) => {
        console.error('Error during report processing:', error);
        this.currentStatusMessage = "An unexpected error occurred during report processing. Please try again.";
        this.isLoading = false;
        setTimeout(() => this.scrollToBottom(), 0); // Scroll after report error
      }
    });
  }

  private triggerFollowUpAi(userMessage: ChatMessage, assistantMessage: ChatMessage): void {
    console.log('triggerFollowUpAi called with userMessage:', userMessage, 'and assistantMessage:', assistantMessage);

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
    console.log('Calling follow-up AI with payload:', followUpPayload, 'and employeeId:', employeeIdNum);
    this.aiService.callAi(followUpPayload, employeeIdNum).subscribe({
      next: (response: string) => {
        // If response is empty, it means AI was disabled by backend check (though now frontend handles it primarily)
        if (!response) {
            console.log('Follow-up AI: AI responses are paused, received empty response.');
            return;
        }

        const doneTagRegex = /\[\[DONE\]\]/;
        const doneMatch = response.match(doneTagRegex);

        if (doneMatch) {
          console.log('Follow-up AI: Previous response was satisfactory. [[DONE]] tag detected.');
        } else {
          console.log('Follow-up AI: Corrective message received.');
          const followUpMessage: ChatMessage = { role: 'assistant', content: response.trim() };
          this.messages.push(followUpMessage);
          this.saveMessageToDb(followUpMessage);
          setTimeout(() => this.scrollToBottom(), 0); // Explicit scroll after follow-up message
        }
      },
      error: (error) => {
        console.error('Follow-up AI call failed:', error);
        setTimeout(() => this.scrollToBottom(), 0); // Explicit scroll after follow-up error
      }
    });
  }

  private scrollToBottom(): void {
    if (this.chatContainer && this.chatContainer.nativeElement) {
      this.chatContainer.nativeElement.scrollTo({
        top: this.chatContainer.nativeElement.scrollHeight,
        behavior: 'smooth'
      });
    }
  }
}