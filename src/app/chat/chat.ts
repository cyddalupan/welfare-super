import { Component, ViewChild, ElementRef, AfterViewChecked, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService } from '../ai.service'; // Import AiService
import { AuthService } from '../auth.service'; // Import AuthService
import { DatabaseService } from '../database.service'; // Import DatabaseService
import { ChatMessage } from '../schemas'; // Import ChatMessage interface
import { SYSTEM_PROMPT_COMPLAINTS_ASSISTANT, SYSTEM_PROMPT_LOGIN_ASSISTANT } from '../prompts'; // Import the system prompts

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
  public userId: string | null = null; // Stores the logged-in user's ID
  public agencyId: string | null = null; // Stores the logged-in user's agency ID
  public employeeMemories: string[] = []; // Stores employee memories

  constructor(
    private aiService: AiService,
    private authService: AuthService,
    private databaseService: DatabaseService // Inject DatabaseService
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
    if (this.newMessage.trim() === '') {
      return;
    }

    this.isLoading = true;
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

    this.aiService.callAi(aiPayload).subscribe({
      next: (response: string) => {
        const processedResponse = this.parseAiResponseForTags(response);
        if (processedResponse) {
          const assistantMessage: ChatMessage = { role: 'assistant', content: processedResponse };
          this.messages.push(assistantMessage);
          this.saveMessageToDb(assistantMessage);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('AI call failed:', error);
        const errorMessage: ChatMessage = { role: 'assistant', content: 'Error: Could not get a response from the AI.' };
        this.messages.push(errorMessage);
        this.saveMessageToDb(errorMessage);
        this.isLoading = false;
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

  private parseAiResponseForTags(response: string): string {
    const loginTagRegex = /\[\[LOGIN, LASTNAME:"([^"]+)",PASSPORT:"([^"]+)"\]\]/;
    // Global flag for memoryTagRegex to find all occurrences
    const memoryTagRegex = /\[\[MEMORY:"([^"]+)"\]\]/g;

    let modifiedResponse = response;
    let loginProcessed = false; // Flag to indicate if login tag was found and processed

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

    // 2. Handle MEMORY tag (new logic)
    // Use exec in a loop to find all matches with the global regex
    let memoryMatch;
    // We need to create a temporary string without the memory tags for display, but process all tags first.
    let responseWithoutMemoryTags = modifiedResponse;
    while ((memoryMatch = memoryTagRegex.exec(modifiedResponse)) !== null) {
      const memoryContent = memoryMatch[1];
      if (this.userId) { // Only save memory if user is authenticated
        // Call the new method to save this content to the database
        // This method will be implemented in DatabaseService next.
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
      // Remove the matched memory tag from the string that will eventually be displayed
      responseWithoutMemoryTags = responseWithoutMemoryTags.replace(memoryMatch[0], '').trim();
    }

    // If a login was processed, we want to ensure the response is empty to reflect the state change in UI,
    // otherwise, return the response without memory tags.
    if (loginProcessed) {
        return '';
    }
    return responseWithoutMemoryTags;
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) { /* Error handling for when element is not yet available */ }
  }
}