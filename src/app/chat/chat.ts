import { Component, ViewChild, ElementRef, AfterViewChecked, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService } from '../ai.service'; // Import AiService
import { ChatMessage } from '../schemas'; // Import ChatMessage interface
import { SYSTEM_PROMPT_COMPLAINTS_ASSISTANT } from '../prompts'; // Import the system prompt

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

  public messages: ChatMessage[] = [
    {
      role: 'system',
      content: SYSTEM_PROMPT_COMPLAINTS_ASSISTANT
    }
  ]; // Local chat history
  public newMessage: string = ''; // Input field binding
  public isLoading: boolean = false; // Loading indicator

  constructor(private aiService: AiService) { } // Inject AiService

  ngOnInit(): void {
    // No chat history loading for now, as per user's request (in-memory only)
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

    // The payload is the entire message history
    const aiPayload: ChatMessage[] = this.messages;

    this.aiService.callAi(aiPayload).subscribe({
      next: (response: string) => {
        this.messages.push({ role: 'assistant', content: response });
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

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) { /* Error handling for when element is not yet available */ }
  }
}