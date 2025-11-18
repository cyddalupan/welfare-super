import { Component, ViewChild, ElementRef, AfterViewChecked, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService } from '../ai.service'; // Import AiService
import { AuthService } from '../auth.service'; // Import AuthService
import { DatabaseService } from '../database.service'; // Import DatabaseService
import { CaseService } from '../case.service'; // Import CaseService
import { ChatMessage } from '../schemas'; // Import ChatMessage interface
import { SYSTEM_PROMPT_COMPLAINTS_ASSISTANT, SYSTEM_PROMPT_LOGIN_ASSISTANT, SYSTEM_PROMPT_FOLLOWUP_ASSISTANT } from '../prompts'; // Import the system prompts

const MAX_TEXTAREA_HEIGHT = 150;

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css']
})
export class ChatComponent implements AfterViewChecked, OnInit {
  title = 'analytics-agent';

  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  @ViewChild('messageInput') private messageInput!: ElementRef;

  public messages: ChatMessage[] = []; // Local chat history
  private systemPrompt: ChatMessage; // Will be set dynamically
  public newMessage: string = ''; // Input field binding
  public isLoading: boolean = false; // Loading indicator
  public currentStatusMessage: string = 'Thinking...'; // New: For displaying current status
  public userId: string | null = null; // Stores the logged-in user's ID
  public agencyId: string | null = null; // Stores the logged-in user's agency ID
  public employeeMemories: string[] = []; // Stores employee memories

  constructor(
    private aiService: AiService,
    private authService: AuthService,
    private databaseService: DatabaseService, // Inject DatabaseService
    private caseService: CaseService // Inject CaseService
  ) {
    this.systemPrompt = {
      role: 'system',
      content: '' // Initialize with empty content, will be set in ngOnInit
    };
  }

  ngOnInit(): void {
    let userId = localStorage.getItem('user_id');
    let agencyId = localStorage.getItem('agency_id');

    // Check for inconsistent state or invalid agencyId from localStorage
    if ((userId && (!agencyId || agencyId === 'null' || agencyId === 'undefined')) || (!userId && agencyId)) {
      this.authService.logout(); // Clear inconsistent localStorage
      userId = null;
      agencyId = null;
    }

    this.userId = userId;
    this.agencyId = agencyId;

    this.setInitialSystemPrompt();

    if (this.userId) {
      // User is logged in and state is consistent
      this.loadChatHistory();
      this.loadEmployeeMemories(); // Load memories for authenticated user
    } else {
      // User is logged out, ensure a clean state
      this.messages = [];
      this.messages.push({ role: 'assistant', content: 'Welcome! To get started, please provide your last name and passport number so I can assist you.' });
    }
  }

  private setInitialSystemPrompt(): void {
    if (this.userId) {
      // Authenticated user prompt
      this.systemPrompt.content = SYSTEM_PROMPT_COMPLAINTS_ASSISTANT;
    } else {
      // Unauthenticated user prompt
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
          console.log('Loaded employee memories:', this.employeeMemories); // DEBUG
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
    this.currentStatusMessage = 'Thinking...'; // Reset status message
    const userMessage: ChatMessage = { role: 'user', content: this.newMessage.trim() };
    this.messages.push(userMessage);
    this.saveMessageToDb(userMessage);

    this.newMessage = ''; // Clear input immediately

    let currentSystemPromptContent = this.systemPrompt.content;

    // Add memories to the system prompt if available and user is authenticated
    if (this.userId && this.employeeMemories && this.employeeMemories.length > 0) {
      const memoriesString = this.employeeMemories.map(memory => `"${memory}"`).join(', ');
      currentSystemPromptContent += `\n\nUser's known characteristics: ${memoriesString}`;
    }

    const systemPromptForAi: ChatMessage = { role: 'system', content: currentSystemPromptContent };

    // Send only the last 10 messages for context, plus the system prompt (which now includes memories)
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

        // Set isLoading to false and reset status message after the initial AI response is processed
        this.isLoading = false;
        this.currentStatusMessage = 'Thinking...';

        // Then, trigger follow-up if an assistant message was generated
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
        this.isLoading = false; // Ensure isLoading is false on error
        this.currentStatusMessage = 'Thinking...'; // Reset status message
      }
    });
    this.adjustTextareaHeight();
  }

  private saveMessageToDb(message: ChatMessage): void {
    console.log('Attempting to save message. UserID:', this.userId, 'AgencyID:', this.agencyId); // DEBUG
    // Explicitly check for null and string "null" or "undefined" from localStorage
    if (this.userId && this.agencyId && this.agencyId !== 'null' && this.agencyId !== 'undefined') {
      console.log('UserID and AgencyID are present. Calling database service.'); // DEBUG
      this.databaseService.saveChatMessage(message, parseInt(this.userId, 10), parseInt(this.agencyId, 10)).subscribe({
        next: () => console.log('Message saved successfully.'), // DEBUG
        error: (err) => console.error('Failed to save message:', err)
      });
    } else {
      console.log('Save skipped: UserID or AgencyID is missing or invalid.'); // DEBUG
    }
  }

    private parseAiResponseForTags(response: string): { response: string, tagProcessed: boolean } {
      const loginTagRegex = /\[\[LOGIN, LASTNAME:"([^"]+)",PASSPORT:"([^"]+)"\]\]/;
      const memoryTagRegex = /\[\[MEMORY:"([^"]+)"\]\]/g;
      const reportTagRegex = /\[\[REPORT\]\]/;
  
      let modifiedResponse = response;
      let loginProcessed = false;
      let reportTriggered = false; // New flag for report
  
      // 1. Handle LOGIN tag (existing logic)
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
              // Clear the "logout conversation" and load the user's chat history.
              this.messages = [];
              this.loadChatHistory();
              this.loadEmployeeMemories(); // Reload memories after login
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
  
      // 2. Handle MEMORY tag (existing logic)
      let memoryMatch;
      let responseWithoutMemoryTags = modifiedResponse;
      while ((memoryMatch = memoryTagRegex.exec(modifiedResponse)) !== null) {
        const memoryContent = memoryMatch[1];
        if (this.userId) { // Only save memory if user is authenticated
          this.databaseService.saveEmployeeMemory(parseInt(this.userId, 10), memoryContent)
            .subscribe({
              next: () => {
                console.log('Memory saved successfully: ', memoryContent);
                this.employeeMemories.push(memoryContent); // Add to local memories
              },
              error: (err) => console.error('Failed to save memory:', err)
            });
        } else {
          console.warn('Attempted to save memory for unauthenticated user:', memoryContent);
        }
        responseWithoutMemoryTags = responseWithoutMemoryTags.replace(memoryMatch[0], '').trim();
      }
      modifiedResponse = responseWithoutMemoryTags; // Update modifiedResponse after memory processing
  
      // 3. Handle REPORT tag (NEW LOGIC)
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

    this.isLoading = true; // Keep loading true during report processing
    this.currentStatusMessage = "I've noticed you're describing a serious issue. I'm starting the process to file a formal report for you."; // Initial status

    // Pass a callback to CaseService to update chat messages
    const onStatusUpdate = (message: string) => {
      this.currentStatusMessage = message; // Update status message
      this.scrollToBottom(); // Scroll to show new status
    };

    // Send only the last 10 messages for context to the report generator
    const historyForReport = this.messages.slice(-10);

    this.caseService.handleReportCreation(parseInt(this.userId, 10), parseInt(this.agencyId, 10), historyForReport, onStatusUpdate).subscribe({
      next: (caseId) => {
        console.log(`Report process completed. Case ID: ${caseId}`);
        this.isLoading = false; // Turn off loading after completion
        this.currentStatusMessage = 'Thinking...'; // Reset status message
      },
      error: (error) => {
        console.error('Error during report processing:', error);
        this.currentStatusMessage = "An unexpected error occurred during report processing. Please try again."; // Display error status
        this.isLoading = false; // Turn off loading on error
      }
    });
  }

  private triggerFollowUpAi(userMessage: ChatMessage, assistantMessage: ChatMessage): void {
    console.log('triggerFollowUpAi called with userMessage:', userMessage, 'and assistantMessage:', assistantMessage);

    // Replicate system prompt construction from sendMessage
    let currentSystemPromptContent = this.systemPrompt.content;
    if (this.userId && this.employeeMemories && this.employeeMemories.length > 0) {
      const memoriesString = this.employeeMemories.map(memory => `"${memory}"`).join(', ');
      currentSystemPromptContent += `\n\nUser's known characteristics: ${memoriesString}`;
    }
    // Append the specific follow-up assistant prompt
    currentSystemPromptContent += `\n\n${SYSTEM_PROMPT_FOLLOWUP_ASSISTANT}`;
    const systemPromptForAi: ChatMessage = { role: 'system', content: currentSystemPromptContent };

    // Send the same context as the initial AI call: system prompt (with memories) + last 10 messages
    const historyForAi = this.messages.slice(-10);
    const followUpPayload: ChatMessage[] = [systemPromptForAi, ...historyForAi];

    console.log('Calling follow-up AI with payload:', followUpPayload);
    this.aiService.callAi(followUpPayload).subscribe({
      next: (response: string) => {
        console.log('Follow-up AI response received:', response);
        const doneTagRegex = /\[\[DONE\]\]/;
        const doneMatch = response.match(doneTagRegex);

        if (doneMatch) {
          console.log('Follow-up AI: Previous response was satisfactory. [[DONE]] tag detected.');
          // No message to display, just complete the loading
        } else {
          console.log('Follow-up AI: Corrective message received.');
          // If no [[DONE]] tag, it's a corrective message
          const followUpMessage: ChatMessage = { role: 'assistant', content: response.trim() };
          this.messages.push(followUpMessage);
          this.saveMessageToDb(followUpMessage);
        }
      },
      error: (error) => {
        console.error('Follow-up AI call failed:', error);
        // Optionally display an error message for the follow-up AI
      }
    });
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) { /* Error handling for when element is not yet available */ }
  }
}