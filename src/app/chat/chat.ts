import { Component, ViewChild, ElementRef, AfterViewChecked, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService } from '../ai.service'; // Import AiService
import { AuthService } from '../auth.service'; // Import AuthService
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

  public messages: ChatMessage[] = []; // Local chat history (only user/assistant messages)
  private systemPrompt: ChatMessage; // Will be set dynamically
  public newMessage: string = ''; // Input field binding
  public isLoading: boolean = false; // Loading indicator
  public userId: string | null = null; // Stores the logged-in user's ID

  constructor(private aiService: AiService, private authService: AuthService) {
    this.systemPrompt = {
      role: 'system',
      content: '' // Initialize with empty content, will be set in ngOnInit
    };
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('user_id');
    this.setInitialSystemPrompt();
  }

  private setInitialSystemPrompt(): void {
    if (this.userId) {
      // Authenticated user prompt
      this.systemPrompt.content = SYSTEM_PROMPT_COMPLAINTS_ASSISTANT;
    } else {
      // Unauthenticated user prompt - prioritize login, but also apply complaints assistant rules
      this.systemPrompt.content = SYSTEM_PROMPT_LOGIN_ASSISTANT + '\n\n' + SYSTEM_PROMPT_COMPLAINTS_ASSISTANT;
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
    const userMessageContent = this.newMessage;
    this.messages.push({ role: 'user', content: userMessageContent });
    this.newMessage = ''; // Clear input immediately

    // The payload sent to AI includes the system prompt followed by the chat history
    const aiPayload: ChatMessage[] = [this.systemPrompt, ...this.messages];

    this.aiService.callAi(aiPayload).subscribe({
      next: (response: string) => {
        const processedResponse = this.parseAiResponseForTags(response);
        if (processedResponse) {
          this.messages.push({ role: 'assistant', content: processedResponse });
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('AI call failed:', error);
        this.messages.push({ role: 'assistant', content: 'Error: Could not get a response from the AI.' });
        this.isLoading = false;
      }
    });
    this.adjustTextareaHeight();
  }

  private parseAiResponseForTags(response: string): string {
    const loginTagRegex = /\[\[LOGIN, LASTNAME:"([^"]+)",PASSPORT:"([^"]+)"\]\]/;
    const match = response.match(loginTagRegex);

    if (match) {
      const lastName = match[1];
      const passportNumber = match[2];
      this.authService.login(lastName, passportNumber).subscribe({
        next: (success) => {
          if (success) {
            this.userId = localStorage.getItem('user_id'); // Update userId after successful login
            this.setInitialSystemPrompt(); // Update system prompt for authenticated user
            this.messages.push({ role: 'assistant', content: 'Login successful! How can I help you today?' });
          } else {
            this.messages.push({ role: 'assistant', content: 'Account does not exist, please double check if input is correct.' });
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.messages.push({ role: 'assistant', content: 'An error occurred during login. Please try again later.' });
        }
      });
      // Remove the tag from the response before displaying
      return response.replace(loginTagRegex, '').trim();
    }
    return response;
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) { /* Error handling for when element is not yet available */ }
  }
}