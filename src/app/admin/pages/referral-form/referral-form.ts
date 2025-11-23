import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Referral } from '../../../schemas'; // Changed from Fra
import { ReferralService } from '../../services/referral.service'; // Changed from FraService

@Component({
  selector: 'app-referral-form', // Changed from app-fra-form
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IonicModule],
  templateUrl: './referral-form.html', // Changed from ./fra-form.html
  styleUrls: ['./referral-form.css'], // Changed from ./fra-form.css
})
export class ReferralFormComponent implements OnInit { // Changed from FraFormComponent
  private referralService = inject(ReferralService); // Changed from fraService
  public router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  referral: Partial<Referral> = {}; // Changed from fra
  isEditMode = false;
  referralId: number | null = null; // Changed from fraId
  isLoading = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.referralId = +id; // Changed from fraId
      this.loadReferralData(this.referralId); // Changed from loadFraData
    }
  }

  async loadReferralData(id: number): Promise<void> { // Changed from loadFraData
    this.isLoading = true;
    this.cdr.detectChanges();
    try {
      const data = await this.referralService.getReferralById(id); // Changed from fraService.getFraById
      if (data) {
        this.referral = data; // Changed from fra
        this.cdr.detectChanges();
      } else {
        this.router.navigate(['/admin/referrals']); // Changed from /admin/fras
      }
    } catch (error) {
      console.error('Error loading Referral data:', error); // Updated error message
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  async saveReferral(): Promise<void> { // Changed from saveFra
    try {
      if (this.isEditMode && this.referralId) { // Changed from fraId
        await this.referralService.updateReferral({ ...this.referral, id: this.referralId } as Referral); // Changed from fraService.updateFra
      } else {
        await this.referralService.createReferral(this.referral as Omit<Referral, 'id' | 'timestamp'>); // Changed from fraService.createFra
      }
      this.router.navigate(['/admin/referrals']); // Changed from /admin/fras
    } catch (error) {
      console.error('Error saving Referral:', error); // Updated error message
      alert('Failed to save Referral.'); // Updated alert message
    }
  }
}
