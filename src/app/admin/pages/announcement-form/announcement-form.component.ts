import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonItem, IonTextarea, IonToggle, IonButton, IonSpinner, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { AnnouncementService } from '../../services/announcement.service';
import { Announcement } from '../../../schemas/announcement';

@Component({
  selector: 'app-announcement-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonItem, IonTextarea, IonToggle, IonButton, IonSpinner, IonCard, IonCardContent],
  templateUrl: './announcement-form.component.html',
  styleUrl: './announcement-form.component.css',
})
export class AnnouncementFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private announcementService = inject(AnnouncementService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  announcementForm!: FormGroup;
  isEditMode = false;
  announcementId: number | null = null;
  isLoading = false;

  ngOnInit(): void {
    this.announcementForm = this.fb.group({
      message: ['', Validators.required],
      is_active: [true], // Default to active
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.announcementId = +id;
        this.isEditMode = true;
        this.loadAnnouncement(this.announcementId);
      }
    });
  }

  async loadAnnouncement(id: number): Promise<void> {
    this.isLoading = true;
    try {
      const announcement = await this.announcementService.getAnnouncementById(id);
      if (announcement) {
        this.announcementForm.patchValue({
          message: announcement.message,
          is_active: announcement.is_active,
        });
      } else {
        // Handle case where announcement is not found
        console.error('Announcement not found');
        this.router.navigate(['/admin/announcements']);
      }
    } catch (error) {
      console.error('Error loading announcement:', error);
      alert('Failed to load announcement.');
      this.router.navigate(['/admin/announcements']);
    } finally {
      this.isLoading = false;
    }
  }

  async saveAnnouncement(): Promise<void> {
    if (this.announcementForm.invalid) {
      this.announcementForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    try {
      const formValue = this.announcementForm.value;
      const announcementData: Omit<Announcement, 'id' | 'created_at' | 'updated_at'> = {
        message: formValue.message,
        is_active: formValue.is_active,
      };

      if (this.isEditMode && this.announcementId !== null) {
        // Cast to Announcement because update expects full object with id
        const fullAnnouncement: Announcement = {
          ...announcementData,
          id: this.announcementId,
          created_at: '', // These will be ignored by mapAnnouncementToParams for update
          updated_at: '', // These will be ignored by mapAnnouncementToParams for update
        };
        await this.announcementService.updateAnnouncement(fullAnnouncement);
        alert('Announcement updated successfully!');
      } else {
        await this.announcementService.createAnnouncement(announcementData);
        alert('Announcement created successfully!');
      }
      this.router.navigate(['/admin/announcements']);
    } catch (error) {
      console.error('Error saving announcement:', error);
      alert('Failed to save announcement.');
    } finally {
      this.isLoading = false;
    }
  }

  cancel(): void {
    this.router.navigate(['/admin/announcements']);
  }
}
