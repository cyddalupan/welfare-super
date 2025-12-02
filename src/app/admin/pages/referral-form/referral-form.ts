import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonCardContent, IonSpinner, IonList, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { Referral } from '../../../schemas';
import { ReferralService } from '../../services/referral.service';

@Component({
  selector: 'app-referral-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonCardContent, IonSpinner, IonList, IonItem, IonInput, IonButton],
  templateUrl: './referral-form.html',
  styleUrls: ['./referral-form.css'],
})
export class ReferralFormComponent implements OnInit {
  private referralService = inject(ReferralService);
  public router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);

  referralForm!: FormGroup;
  isEditMode = false;
  referralId: number | null = null;
  isLoading = false;

  ngOnInit(): void {
    this.referralForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      contact: ['', [Validators.required, Validators.maxLength(255)]],
      referred_by: ['', [Validators.required, Validators.maxLength(255)]],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.referralId = +id;
      this.loadReferralData(this.referralId);
    }
  }

  async loadReferralData(id: number): Promise<void> {
    this.isLoading = true;
    this.cdr.detectChanges();
    try {
      const data = await this.referralService.getReferralById(id);
      if (data) {
        this.referralForm.patchValue(data);
      } else {
        this.router.navigate(['/admin/referrals']);
      }
    } catch (error) {
      console.error('Error loading Referral data:', error);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  async saveReferral(): Promise<void> {
    if (this.referralForm.invalid) {
      this.referralForm.markAllAsTouched();
      // Optionally, add a toast message to inform the user
      // this.presentToast('Please fill all required fields correctly.', 'danger');
      return;
    }

    try {
      const referralData = this.referralForm.value;
      if (this.isEditMode && this.referralId) {
        await this.referralService.updateReferral({ ...referralData, id: this.referralId } as Referral);
      } else {
        await this.referralService.createReferral(referralData as Omit<Referral, 'id' | 'timestamp'>);
      }
      this.router.navigate(['/admin/referrals']);
    } catch (error) {
      console.error('Error saving Referral:', error);
      alert('Failed to save Referral.');
    }
  }
}
