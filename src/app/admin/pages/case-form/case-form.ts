import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular'; // <--- Added this import
import { Case, Applicant } from '../../../schemas';
import { CaseService } from '../../services/case.service';
import { ApplicantService } from '../../services/applicant.service'; // To get applicants for dropdown

@Component({
  selector: 'app-case-form',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule], // <--- Added IonicModule here
  templateUrl: './case-form.html',
  styleUrl: './case-form.css',
})
export class CaseFormComponent implements OnInit {
  private caseService = inject(CaseService);
  private applicantService = inject(ApplicantService);
  private route = inject(ActivatedRoute);
  public router = inject(Router);
  private cdr = inject(ChangeDetectorRef); // Inject ChangeDetectorRef

  caseItem: Partial<Case> = {
    report_status: 'open' // Default status
  };
  applicants: Applicant[] = []; // For the applicant dropdown
  isEditMode = false;
  isLoading = false; // Add loading state

  async ngOnInit(): Promise<void> {
    this.isLoading = true; // Set loading to true at the start
    this.cdr.detectChanges(); // Force change detection to show loading indicator immediately
    try {
      await this.loadApplicants(); // Ensure applicants are loaded first
      this.route.paramMap.subscribe(async params => { // Use async here for await loadCase
        const id = params.get('id');
        if (id) {
          this.isEditMode = true;
          await this.loadCase(+id); // Await loadCase
        }
        this.isLoading = false; // Set loading to false after everything is loaded
        this.cdr.detectChanges(); // Force change detection to hide loading indicator immediately
      });
    } catch (error) {
      console.error('Error during initialization:', error);
      this.isLoading = false; // Ensure loading is false on error
      this.cdr.detectChanges(); // Force change detection on error
    }
  }

  async loadApplicants(): Promise<void> {
    try {
      this.applicants = await this.applicantService.getApplicants();
    } catch (error) {
      console.error('Error loading applicants:', error);
    }
  }

  async loadCase(id: number): Promise<void> {
    try {
      const fetchedCase = await this.caseService.getCaseById(id);
      if (fetchedCase) {
        this.caseItem = fetchedCase;
      } else {
        console.error('Case not found');
        this.router.navigate(['/admin/cases']);
      }
    } catch (error) {
      console.error('Error loading case:', error);
    }
  }

  async saveCase(): Promise<void> {
    try {
      if (this.isEditMode) {
        await this.caseService.updateCase(this.caseItem as Case);
      } else {
        await this.caseService.createCase(this.caseItem as Omit<Case, 'id' | 'date_reported' | 'updated_date'>);
      }
      this.router.navigate(['/admin/cases']);
    } catch (error) {
      console.error('Error saving case:', error);
      alert('Failed to save case.');
    }
  }
}
