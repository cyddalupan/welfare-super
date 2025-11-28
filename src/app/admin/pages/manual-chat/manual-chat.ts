import { Component, ViewChild, ElementRef, AfterViewChecked, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { DatabaseService } from '../../../database.service';
import { ChatMessage, Applicant } from '../../../schemas'; // Import Applicant
import { ApplicantService } from '../../services/applicant.service'; // Import ApplicantService
import { AuthService } from '../../services/auth.service'; // Import AuthService

@Component({
  selector: 'app-manual-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './manual-chat.html',
  styleUrls: ['./manual-chat.css']
})
export class ManualChatComponent implements AfterViewChecked, OnInit {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  @ViewChild('messageInput') private messageInput!: ElementRef;

  public messages: ChatMessage[] = [];
  public newMessage: string = '';
  public isLoading: boolean = false;
  public applicantId: number | null = null;
  public applicantName: string = 'Applicant';

  private databaseService = inject(DatabaseService);
  private route = inject(ActivatedRoute);
  private applicantService = inject(ApplicantService); // Inject ApplicantService
  private authService = inject(AuthService); // Inject AuthService

  MAX_TEXTAREA_HEIGHT = 150;

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => { // Made async to await loadApplicantDetails
      const id = params.get('id');
      if (id) {
        this.applicantId = parseInt(id, 10);
        await this.loadApplicantDetails(this.applicantId); // Load applicant details
        this.loadChatHistory(this.applicantId);
      }
    });
  }

  async loadApplicantDetails(applicantId: number): Promise<void> {
    try {
      const applicant = await this.applicantService.getApplicantById(applicantId);
      if (applicant) {
        this.applicantName = `${applicant.first_name} ${applicant.last_name}`;
      }
    } catch (error) {
      console.error('Error loading applicant details:', error);
      this.applicantName = 'Unknown Applicant';
    }
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private loadChatHistory(applicantId: number): void {
    this.isLoading = true;
    this.databaseService.getChatHistory(applicantId).subscribe({
      next: (history) => {
        this.messages = history;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load chat history:', error);
        this.messages.push({ role: 'system', content: 'Error: Could not load chat history for this applicant.' });
        this.isLoading = false;
      }
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim() === '' || this.applicantId === null) {
      return;
    }

    const adminMessage: ChatMessage = { role: 'assistant', content: this.newMessage.trim() };
    this.messages.push(adminMessage);

    this.isLoading = true; // Indicate loading while saving and disabling AI

    this.saveAdminMessageToDb(adminMessage, this.applicantId).subscribe({
      next: () => {
        console.log('Admin message saved and AI disabled for applicant:', this.applicantId);
        this.newMessage = '';
        this.isLoading = false;
        this.adjustTextareaHeight();
      },
      error: (error) => {
        console.error('Error saving admin message or disabling AI:', error);
        this.isLoading = false;
        // Optionally show an error message to the admin
      }
    });
  }

  private saveAdminMessageToDb(message: ChatMessage, applicantId: number): Observable<any> {
    const adminAgencyId = 0; // Default or retrieve actual admin agency ID if applicable
                              // This will need to be properly handled if admin's agency matters.

    return this.databaseService.saveChatMessage(message, applicantId, adminAgencyId).pipe(
      concatMap(() => this.databaseService.disableAiForApplicant(applicantId, 10)) // Disable AI for 10 minutes
    );
  }

  public adjustTextareaHeight(): void {
    if (this.messageInput && this.messageInput.nativeElement) {
      const element = this.messageInput.nativeElement;
      element.style.height = 'auto';
      element.style.height = Math.min(element.scrollHeight, this.MAX_TEXTAREA_HEIGHT) + 'px';
      element.style.overflowY = element.scrollHeight > this.MAX_TEXTAREA_HEIGHT ? 'auto' : 'hidden';
    }
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) { /* Error handling */ }
  }
}
