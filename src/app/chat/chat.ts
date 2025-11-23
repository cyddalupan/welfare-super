import { Component, ViewChild, ElementRef, AfterViewChecked, OnInit } from '@angular/core';
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

const MAX_TEXTAREA_HEIGHT = 150;

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css']
})
export class ChatComponent implements AfterViewChecked, OnInit {
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

  constructor(
    private aiService: AiService,
    private authService: AuthService,
    private databaseService: DatabaseService,
    private caseService: CaseService,
    private announcementService: AnnouncementService // Inject AnnouncementService
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
      this.loadChatHistory();
      this.loadEmployeeMemories();
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

  private loadChatHistory(): void {
    if (this.userId) {
      this.databaseService.getChatHistory(parseInt(this.userId, 10)).subscribe({
        next: (history) => {
          this.messages = history;
        },
        error: (error) => {
          console.error('Failed to load chat history:', error);
          this.messages.push({ role: 'assistant', content: 'Sorry, I was unable to load your previous conversation.' });
        }
      });
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

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  public adjustTextareaHeight(): void {
    if (this.messageInput && this.messageInput.nativeElement) {
      const element = this.messageInput.nativeElement;
      element.style.height = 'auto';
      element.style.height = Math.min(element.scrollHeight, MAX_TEXTAREA_HEIGHT) + 'px';
      element.style.overflowY = element.scrollHeight > MAX_TEXTAREA_HEIGHT ? 'auto' : 'hidden';
    }
  }

  sendMessage(): void {
    console.log('sendMessage called.');
    if (this.newMessage.trim() === '') {
      console.log('New message is empty, returning.');
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

    let currentSystemPromptContent = this.systemPrompt.content;

    if (this.userId && this.employeeMemories && this.employeeMemories.length > 0) {
      const memoriesString = this.employeeMemories.map(memory => `"${memory}"`).join(', ');
      currentSystemPromptContent += `\n\nUser's known characteristics: ${memoriesString}`;
    }

    const systemPromptForAi: ChatMessage = { role: 'system', content: currentSystemPromptContent };

    const historyForAi = this.messages.slice(-10);
    const aiPayload: ChatMessage[] = [systemPromptForAi, ...historyForAi];

    console.log('Calling initial AI with payload:', aiPayload);
    this.aiService.callAi(aiPayload).subscribe({
      next: (response: string) => {
        console.log('Initial AI response received:', response);
        const { response: processedResponse, tagProcessed } = this.parseAiResponseForTags(response);
        let assistantMessage: ChatMessage | null = null;
        if (processedResponse) {
          assistantMessage = { role: 'assistant', content: processedResponse };
          this.messages.push(assistantMessage);
          this.saveMessageToDb(assistantMessage);
          console.log('Assistant message added:', assistantMessage);
        }

        this.isLoading = false;
        this.currentStatusMessage = '';

        if (assistantMessage) {
          console.log('Triggering follow-up AI.');
          this.triggerFollowUpAi(userMessage, assistantMessage);
        }
      },
      error: (error) => {
        console.error('AI call failed:', error);
        const errorMessage: ChatMessage = { role: 'assistant', content: 'Error: Could not get a response from the AI.' };
        this.messages.push(errorMessage);
        this.saveMessageToDb(errorMessage);
        this.isLoading = false;
        this.currentStatusMessage = '';
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

    private parseAiResponseForTags(response: string): { response: string, tagProcessed: boolean } {
      const loginTagRegex = /\[\[LOGIN, LASTNAME:"([^"]+)",PASSPORT:"([^"]+)"\]\]/;
      const memoryTagRegex = /\[\[MEMORY:"([^"]+)"\]\]/g;
      const reportTagRegex = /\[\[REPORT\]\]/;
  
      let modifiedResponse = response;
      let loginProcessed = false;
      let reportTriggered = false;
  
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
            }
          },
          error: (error) => {
            console.error('Login failed:', error);
            const loginErrorMessage: ChatMessage = { role: 'assistant', content: 'An error occurred during login. Please try again later.' };
            this.messages.push(loginErrorMessage);
            this.saveMessageToDb(loginErrorMessage);
          }
        });
        modifiedResponse = modifiedResponse.replace(loginTagRegex, '').trim();
        loginProcessed = true;
      }
  
      let memoryMatch;
      let responseWithoutMemoryTags = modifiedResponse;
      while ((memoryMatch = memoryTagRegex.exec(modifiedResponse)) !== null) {
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
        responseWithoutMemoryTags = responseWithoutMemoryTags.replace(memoryMatch[0], '').trim();
      }
      modifiedResponse = responseWithoutMemoryTags;
  
      const reportMatch = modifiedResponse.match(reportTagRegex);
      if (reportMatch) {
        reportTriggered = true;
        modifiedResponse = modifiedResponse.replace(reportTagRegex, '').trim();
        if (this.userId) {
          this.handleReportTag();
        } else {
          console.warn('[[REPORT]] tag detected for unauthenticated user. Ignoring.');
          const unauthReportMessage: ChatMessage = { role: 'assistant', content: 'Please log in to file a report.' };
          this.messages.push(unauthReportMessage);
          this.saveMessageToDb(unauthReportMessage);
        }
      }
  
      return {
        response: modifiedResponse,
        tagProcessed: loginProcessed || reportTriggered
      };
    }
  private handleReportTag(): void {
    if (!this.userId || !this.agencyId) {
      console.error('handleReportTag called without a valid userId or agencyId.');
      return;
    }

    this.isLoading = true;
    this.currentStatusMessage = "I've noticed you're describing a serious issue. I'm starting the process to file a formal report for you.";

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
      },
      error: (error) => {
        console.error('Error during report processing:', error);
        this.currentStatusMessage = "An unexpected error occurred during report processing. Please try again.";
        this.isLoading = false;
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

    console.log('Calling follow-up AI with payload:', followUpPayload);
    this.aiService.callAi(followUpPayload).subscribe({
      next: (response: string) => {
        const doneTagRegex = /\[\[DONE\]\]/;
        const doneMatch = response.match(doneTagRegex);

        if (doneMatch) {
          console.log('Follow-up AI: Previous response was satisfactory. [[DONE]] tag detected.');
        } else {
          console.log('Follow-up AI: Corrective message received.');
          const followUpMessage: ChatMessage = { role: 'assistant', content: response.trim() };
          this.messages.push(followUpMessage);
          this.saveMessageToDb(followUpMessage);
        }
      },
      error: (error) => {
        console.error('Follow-up AI call failed:', error);
      }
    });
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) { /* Error handling for when element is not yet available */ }
  }
}