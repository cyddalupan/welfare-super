import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular'; // <--- Added this import
import { Applicant } from '../../../schemas';
import { ApplicantService } from '../../services/applicant.service';
import { FraService } from '../../services/fra.service';
import { Fra } from '../../../schemas';

@Component({
  selector: 'app-applicant-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IonicModule], // <--- Added IonicModule here
  templateUrl: './applicant-form.html',
  styleUrls: ['./applicant-form.css'],
})
export class ApplicantFormComponent implements OnInit {
  private applicantService = inject(ApplicantService);
  private fraService = inject(FraService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef); // Inject ChangeDetectorRef

  applicant: Partial<Applicant> = {};
  isEditMode = false;
  applicantId: number | null = null;
  isLoading = false; // Add loading state
  statuses: string[] = []; // Add statuses property
  fras: Fra[] = [];

  ngOnInit(): void {
    this.loadStatuses(); // Load statuses when the component initializes
    this.loadFras();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.applicantId = +id;
      this.loadApplicantData(this.applicantId);
    }
  }

  async loadFras(): Promise<void> {
    try {
      this.fras = await this.fraService.getFras();
    } catch (error) {
      console.error('Error loading FRAs:', error);
    }
  }

  async loadStatuses(): Promise<void> {
    try {
      this.statuses = await this.applicantService.getStatuses();
    } catch (error) {
      console.error('Error loading statuses:', error);
    }
  }

  async loadApplicantData(id: number): Promise<void> {
    this.isLoading = true; // Set loading to true
    this.cdr.detectChanges(); // Force change detection to show loading indicator immediately
    try {
      const data = await this.applicantService.getApplicantById(id);
      if (data) {
        this.applicant = data;
        this.cdr.detectChanges(); // Manually trigger change detection
      } else {
        // Handle case where applicant is not found
        this.router.navigate(['/admin/applicants']);
      }
    } catch (error) {
      console.error('Error loading applicant data:', error);
    } finally {
      this.isLoading = false; // Set loading to false
      this.cdr.detectChanges(); // Force change detection to hide loading indicator immediately
    }
  }

  async saveApplicant(): Promise<void> {
    try {
      if (this.isEditMode && this.applicantId) {
        await this.applicantService.updateApplicant({ ...this.applicant, id: this.applicantId } as Applicant);
      } else {
        await this.applicantService.createApplicant(this.applicant as Omit<Applicant, 'id'>);
      }
      this.router.navigate(['/admin/applicants']);
    } catch (error) {
      console.error('Error saving applicant:', error);
      alert('Failed to save applicant.');
    }
  }
}
