import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { Applicant } from '../../../schemas';
import { ApplicantService } from '../../services/applicant.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-applicant-complaints-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IonicModule],
  templateUrl: './applicant-complaints-list.html',
  styleUrl: './applicant-complaints-list.css',
})
export class ApplicantComplaintsListComponent implements OnInit, ViewWillEnter {
  private applicantService = inject(ApplicantService);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  allApplicants: Applicant[] = [];
  filteredApplicants: Applicant[] = [];
  searchTerm = '';
  isLoading = false;
  isAdminUser: boolean = false;

  private sortDirection: { [key: string]: 'asc' | 'desc' } = {};

  ngOnInit(): void {
    this.loadApplicants();
    this.isAdminUser = this.authService.getUserType() === 'admin';
  }

  ionViewWillEnter(): void {
    this.loadApplicants();
  }

  async loadApplicants(): Promise<void> {
    this.isLoading = true;
    this.cdr.detectChanges();
    try {
      // Use the modified getApplicants to filter by likeStatus
      this.allApplicants = await this.applicantService.getApplicants(undefined, 'complain');
      this.filterApplicants();
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error loading applicants with complaints:', error);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  filterApplicants(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredApplicants = this.allApplicants.filter(app =>
      (app.first_name?.toLowerCase() ?? '').includes(term) ||
      (app.last_name?.toLowerCase() ?? '').includes(term) ||
      (app.passport_number?.toLowerCase() ?? '').includes(term) ||
      (app.country?.toLowerCase() ?? '').includes(term)
    );
  }

  sort(field: keyof Applicant): void {
    const direction = this.sortDirection[field] === 'asc' ? 'desc' : 'asc';
    this.sortDirection = { [field]: direction };

    this.filteredApplicants.sort((a, b) => {
      const valA = a[field] ?? '';
      const valB = b[field] ?? '';
      if (valA < valB) return direction === 'asc' ? -1 : 1;
      if (valA > valB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  async deleteApplicant(id: number): Promise<void> {
    if (confirm('Are you sure you want to delete this applicant?')) {
      try {
        await this.applicantService.deleteApplicant(id);
        this.loadApplicants();
      } catch (error) {
        console.error('Error deleting applicant:', error);
        alert('Failed to delete applicant.');
      }
    }
  }
}
