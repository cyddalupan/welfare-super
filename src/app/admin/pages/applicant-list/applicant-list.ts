import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular'; // <--- Added this import
import { Applicant } from '../../../schemas';
import { ApplicantService } from '../../services/applicant.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IonicModule], // <--- Added IonicModule here
  templateUrl: './applicant-list.html',
  styleUrl: './applicant-list.css',
})
export class ApplicantListComponent implements OnInit {
  private applicantService = inject(ApplicantService);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);

  allApplicants: Applicant[] = [];
  filteredApplicants: Applicant[] = [];
  searchTerm = '';
  isLoading = false;
  currentStatus: string | null = null;

  private sortDirection: { [key: string]: 'asc' | 'desc' } = {};

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.currentStatus = params.get('status');
      this.loadApplicants(this.currentStatus ?? undefined);
    });
  }

  async loadApplicants(status?: string): Promise<void> {
    this.isLoading = true;
    this.cdr.detectChanges();
    try {
      this.allApplicants = await this.applicantService.getApplicants(status);
      this.filterApplicants(); // Apply search term filter
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error loading applicants:', error);
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
        this.loadApplicants(); // Refresh the list
      } catch (error) {
        console.error('Error deleting applicant:', error);
        alert('Failed to delete applicant.');
      }
    }
  }
}

