import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonSpinner, IonCardTitle, IonList, IonItem, IonInput, IonSelect, IonSelectOption, IonTextarea, IonButton } from '@ionic/angular/standalone';
import { Applicant } from '../../../schemas';
import { ApplicantService } from '../../services/applicant.service';
import { FraService } from '../../services/fra.service';
import { Fra } from '../../../schemas';

@Component({
  selector: 'app-applicant-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonSpinner, IonCardTitle, IonList, IonItem, IonInput, IonSelect, IonSelectOption, IonTextarea, IonButton],
  templateUrl: './applicant-form.html',
  styleUrls: ['./applicant-form.css'],
})
export class ApplicantFormComponent implements OnInit {
  private applicantService = inject(ApplicantService);
  private fraService = inject(FraService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);

  applicantForm!: FormGroup;
  isEditMode = false;
  applicantId: number | null = null;
  isLoading = false;
  statuses: string[] = [];
  fras: Fra[] = [];

  ngOnInit(): void {
    this.applicantForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.maxLength(100)]],
      middle_name: ['', Validators.maxLength(100)],
      last_name: ['', [Validators.required, Validators.maxLength(100)]],
      passport_number: ['', Validators.maxLength(50)],
      date_of_birth: [null],
      address: ['', Validators.maxLength(255)],
      phone_number: ['', Validators.maxLength(20)],
      email: ['', [Validators.email, Validators.maxLength(255)]],
      is_support: [false],
      token: ['', Validators.maxLength(255)],
      user_id: [null],
      date_deployment: [null],
      fra_id: [null],
      main_status: ['', Validators.required],
      applicant_type: ['', Validators.required],
      created_date_of_report: [null],
      country: ['', Validators.maxLength(50)], // Assuming max 50 for country name
      facebook: ['', Validators.pattern(/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/)],
      whatsapp: ['', Validators.maxLength(20)],
      consistency_percentage: [0, [Validators.min(0), Validators.max(100)]],
      agency_id: [null],
      emergency_contact_name: ['', Validators.maxLength(100)],
      emergency_contact_phone: ['', Validators.maxLength(20)],
    });

    this.loadStatuses();
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
    this.isLoading = true;
    this.cdr.detectChanges();
    try {
      const data = await this.applicantService.getApplicantById(id);
      if (data) {
        this.applicantForm.patchValue(data);
      } else {
        this.router.navigate(['/admin/applicants']);
      }
    } catch (error) {
      console.error('Error loading applicant data:', error);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  async saveApplicant(): Promise<void> {
    if (this.applicantForm.invalid) {
      this.applicantForm.markAllAsTouched();
      // Optionally, add a toast message to inform the user
      // this.presentToast('Please fill all required fields correctly.', 'danger');
      return;
    }

    try {
      const applicantData = this.applicantForm.value;
      if (this.isEditMode && this.applicantId) {
        await this.applicantService.updateApplicant({ ...applicantData, id: this.applicantId } as Applicant);
      } else {
        await this.applicantService.createApplicant(applicantData as Omit<Applicant, 'id'>);
      }
      this.router.navigate(['/admin/applicants']);
    } catch (error) {
      console.error('Error saving applicant:', error);
      alert('Failed to save applicant.');
    }
  }
}
