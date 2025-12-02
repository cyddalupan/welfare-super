import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonSearchbar, IonSpinner, IonList, IonItemDivider, IonLabel, IonItem, IonToggle } from '@ionic/angular/standalone';
import { Announcement } from '../../../schemas/announcement';
import { AnnouncementService } from '../../services/announcement.service';
import { AuthService } from '../../services/auth.service'; // Still need AuthService for user_type

@Component({
  selector: 'app-announcement-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonSearchbar, IonSpinner, IonList, IonItemDivider, IonLabel, IonItem, IonToggle],
  templateUrl: './announcement-list.component.html',
  styleUrl: './announcement-list.component.css',
})
export class AnnouncementListComponent implements OnInit, ViewWillEnter {
  private announcementService = inject(AnnouncementService);
  private cdr = inject(ChangeDetectorRef);
  private authService = inject(AuthService);

  allAnnouncements: Announcement[] = [];
  filteredAnnouncements: Announcement[] = [];
  searchTerm = '';
  isLoading = false;
  isAdminUser: boolean = false; // To control delete permissions

  private sortDirection: { [key: string]: 'asc' | 'desc' } = {};

  ngOnInit(): void {
    this.loadAnnouncements();
    this.isAdminUser = this.authService.getUserType() === 'admin';
  }

  ionViewWillEnter(): void {
    this.loadAnnouncements();
  }

  async loadAnnouncements(): Promise<void> {
    this.isLoading = true;
    this.cdr.detectChanges();
    try {
      this.allAnnouncements = await this.announcementService.getAnnouncements();
      this.filterAnnouncements();
    } catch (error) {
      console.error('Error loading announcements:', error);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  filterAnnouncements(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredAnnouncements = this.allAnnouncements.filter(announcement =>
      (announcement.message?.toLowerCase() ?? '').includes(term)
    );
  }

  sort(field: keyof Announcement): void {
    const direction = this.sortDirection[field] === 'asc' ? 'desc' : 'asc';
    this.sortDirection = { [field]: direction };

    this.filteredAnnouncements.sort((a, b) => {
      const valA = a[field] ?? '';
      const valB = b[field] ?? '';

      // Handle boolean for is_active
      if (typeof valA === 'boolean' && typeof valB === 'boolean') {
        if (valA === valB) return 0;
        return direction === 'asc' ? (valA ? -1 : 1) : (valA ? 1 : -1);
      }
      
      // Handle dates
      if (field === 'created_at' || field === 'updated_at') {
        const dateA = new Date(valA as string).getTime();
        const dateB = new Date(valB as string).getTime();
        if (dateA === dateB) return 0;
        return direction === 'asc' ? (dateA < dateB ? -1 : 1) : (dateA < dateB ? 1 : -1);
      }

      // Default string comparison
      if (String(valA) < String(valB)) return direction === 'asc' ? -1 : 1;
      if (String(valA) > String(valB)) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  async deleteAnnouncement(id: number): Promise<void> {
    if (confirm('Are you sure you want to delete this announcement?')) {
      try {
        await this.announcementService.deleteAnnouncement(id);
        this.loadAnnouncements();
      } catch (error) {
        console.error('Error deleting announcement:', error);
        alert('Failed to delete announcement.');
      }
    }
  }

  async toggleActive(announcement: Announcement): Promise<void> {
    const originalStatus = announcement.is_active;
    announcement.is_active = !originalStatus; // Optimistically update UI

    try {
      await this.announcementService.updateAnnouncement(announcement);
      // If successful, UI is already updated
    } catch (error) {
      console.error('Error toggling announcement status:', error);
      announcement.is_active = originalStatus; // Revert on error
      alert('Failed to toggle announcement status.');
    }
  }
}
