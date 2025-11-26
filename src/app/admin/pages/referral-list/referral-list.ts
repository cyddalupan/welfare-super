import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Referral } from '../../../schemas'; // Changed from Fra
import { ReferralService } from '../../services/referral.service'; // Changed from FraService
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-referral-list', // Changed from app-fra-list
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IonicModule],
  templateUrl: './referral-list.html', // Changed from ./fra-list.html
  styleUrl: './referral-list.css', // Changed from ./fra-list.css
})
export class ReferralListComponent implements OnInit { // Changed from FraListComponent
  private referralService = inject(ReferralService); // Changed from fraService
  private cdr = inject(ChangeDetectorRef);
  private authService = inject(AuthService);

  allReferrals: Referral[] = []; // Changed from allFras
  filteredReferrals: Referral[] = []; // Changed from filteredFras
  searchTerm = '';
  isLoading = false;
  isAdminUser: boolean = false;

  private sortDirection: { [key: string]: 'asc' | 'desc' } = {};

  ngOnInit(): void {
    this.loadReferrals(); // Changed from loadFras
    this.isAdminUser = this.authService.getUserType() === 'admin';
  }

  async loadReferrals(): Promise<void> { // Changed from loadFras
    this.isLoading = true;
    this.cdr.detectChanges();
    try {
      this.allReferrals = await this.referralService.getReferrals(); // Changed from fraService.getFras
      this.filterReferrals(); // Changed from filterFras
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error loading Referrals:', error); // Updated error message
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  filterReferrals(): void { // Changed from filterFras
    const term = this.searchTerm.toLowerCase();
    this.filteredReferrals = this.allReferrals.filter(referral => // Changed from allFras.filter(fra
      (referral.name?.toLowerCase() ?? '').includes(term) ||
      (referral.contact?.toLowerCase() ?? '').includes(term) ||
      (referral.referred_by?.toLowerCase() ?? '').includes(term) // Changed from country
    );
  }

  sort(field: keyof Referral): void { // Changed from keyof Fra
    const direction = this.sortDirection[field] === 'asc' ? 'desc' : 'asc';
    this.sortDirection = { [field]: direction };

    this.filteredReferrals.sort((a, b) => { // Changed from filteredFras.sort
      const valA = a[field] ?? '';
      const valB = b[field] ?? '';
      if (valA < valB) return direction === 'asc' ? -1 : 1;
      if (valA > valB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  async deleteReferral(id: number): Promise<void> { // Changed from deleteFra
    if (confirm('Are you sure you want to delete this Referral?')) { // Updated confirmation message
      try {
        await this.referralService.deleteReferral(id); // Changed from fraService.deleteFra
        this.loadReferrals(); // Changed from loadFras
      } catch (error) {
        console.error('Error deleting Referral:', error); // Updated error message
        alert('Failed to delete Referral.'); // Updated alert message
      }
    }
  }
}
