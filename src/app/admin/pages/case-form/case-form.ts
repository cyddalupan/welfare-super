import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonCardContent, IonSpinner, IonList, IonItem, IonSelect, IonSelectOption, IonInput, IonTextarea, IonButton } from '@ionic/angular/standalone';
import { Case, Applicant } from '../../../schemas';
import { CaseService } from '../../services/case.service';
import { ApplicantService } from '../../services/applicant.service'; // To get applicants for dropdown

@Component({
  selector: 'app-case-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonCardContent, IonSpinner, IonList, IonItem, IonSelect, IonSelectOption, IonInput, IonTextarea, IonButton],
  templateUrl: './case-form.html',
  styleUrl: './case-form.css',
})
export class CaseFormComponent implements OnInit {
  private caseService = inject(CaseService);
  private applicantService = inject(ApplicantService);
  private route = inject(ActivatedRoute);
  public router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);

  caseForm!: FormGroup;
  applicants: Applicant[] = []; // For the applicant dropdown
  isEditMode = false;
  isLoading = false; // Add loading state

  async ngOnInit(): Promise<void> {
    this.caseForm = this.fb.group({
      employee_id: [null, Validators.required],
      category: ['', [Validators.required, Validators.maxLength(50)]],
      report: ['', Validators.required],
      report_status: ['open', [Validators.required, Validators.maxLength(15)]], // Default to 'open'
      agency_id: [null],
    });

    this.isLoading = true;
    this.cdr.detectChanges();
    try {
      await this.loadApplicants();
      this.route.paramMap.subscribe(async params => {
        const id = params.get('id');
        if (id) {
          this.isEditMode = true;
          await this.loadCase(+id);
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      });
    } catch (error) {
      console.error('Error during initialization:', error);
      this.isLoading = false;
      this.cdr.detectChanges();
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
        this.caseForm.patchValue({
          employee_id: fetchedCase.employee_id,
          category: fetchedCase.category,
          report: fetchedCase.report,
          report_status: fetchedCase.report_status,
          agency_id: fetchedCase.agency_id,
        });
      } else {
        console.error('Case not found');
        this.router.navigate(['/admin/cases']);
      }
    } catch (error) {
      console.error('Error loading case:', error);
    }
  }

  async saveCase(): Promise<void> {
    if (this.caseForm.invalid) {
      this.caseForm.markAllAsTouched();
      // Optionally, add a toast message to inform the user
      // this.presentToast('Please fill all required fields correctly.', 'danger');
      return;
    }

    try {
      const caseData = this.caseForm.value;
      if (this.isEditMode) {
        await this.caseService.updateCase({ ...caseData, id: this.route.snapshot.params['id'] } as Case);
      } else {
        await this.caseService.createCase(caseData as Omit<Case, 'id' | 'date_reported' | 'updated_date'>);
      }
      this.router.navigate(['/admin/cases']);
    } catch (error) {
      console.error('Error saving case:', error);
      alert('Failed to save case.');
    }
  }
}
