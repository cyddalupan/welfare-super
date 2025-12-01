import { Component, ViewChild, ElementRef, AfterViewChecked, OnInit, inject, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { DatabaseService } from '../../../database.service';
import { ChatMessage, Applicant } from '../../../schemas';
import { ApplicantService } from '../../services/applicant.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-manual-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './manual-chat.html',
  styleUrls: ['./manual-chat.css']
})
export class ManualChatComponent implements AfterViewChecked, OnInit, OnDestroy {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  @ViewChild('messageInput') private messageInput!: ElementRef;
  @ViewChild(IonContent) private content!: IonContent;

  public messages: ChatMessage[] = [];
  public newMessage: string = '';
  public isLoading: boolean = false;
  public applicantId: number | null = null;
  public applicantName: string = 'Applicant';

  private refreshInterval: any;

  private databaseService = inject(DatabaseService);
  private route = inject(ActivatedRoute);
  private applicantService = inject(ApplicantService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  MAX_TEXTAREA_HEIGHT = 150;

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
      const id = params.get('id');
      if (id) {
        this.applicantId = parseInt(id, 10);
        await this.loadApplicantDetails(this.applicantId);
        this.loadChatHistory(this.applicantId); // Initial load

        // Set up refresh interval
        this.refreshInterval = setInterval(() => {
          if (!this.isLoading) { // Only refresh if not already loading to prevent overlapping calls
            this.loadChatHistory(this.applicantId!);
          }
        }, 10000); // Refresh every 10 seconds
      }
    });
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
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
    this.cdr.detectChanges();
    this.databaseService.getChatHistory(applicantId).subscribe({
      next: (history) => {
        this.messages = history;
        this.isLoading = false;
        this.cdr.detectChanges();
        setTimeout(() => this.scrollToBottom(), 50);
      },
      error: (error) => {
        console.error('Failed to load chat history:', error);
        this.messages.push({ role: 'system', content: 'Error: Could not load chat history for this applicant.' });
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim() === '' || this.applicantId === null) {
      return;
    }

    const adminMessage: ChatMessage = { role: 'assistant', content: this.newMessage.trim() + ' [[ADMIN]]' };
    this.messages.push(adminMessage);

    this.isLoading = true;

    this.saveAdminMessageToDb(adminMessage, this.applicantId).subscribe({
      next: () => {
        console.log('Admin message saved and AI disabled for applicant:', this.applicantId);
        this.newMessage = '';
        this.isLoading = false;
        this.adjustTextareaHeight();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error saving admin message or disabling AI:', error);
        this.isLoading = false;
        // Optionally show an error message to the admin
      }
    });
  }

  private saveAdminMessageToDb(message: ChatMessage, applicantId: number): Observable<any> {
    const adminAgencyId = 0;

    return this.databaseService.saveChatMessage(message, applicantId, adminAgencyId).pipe(
      concatMap(() => this.databaseService.disableAiForApplicant(applicantId, 10))
    );
  }

  public getDisplayContent(message: ChatMessage): string {
    if (message.role === 'assistant' && message.content.includes(' [[ADMIN]]')) {
      return message.content.replace(' [[ADMIN]]', '');
    }
    return message.content;
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
      this.content.scrollToBottom(300);
    } catch (err) { }
  }
}
