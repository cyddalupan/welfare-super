import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular'; // <--- Added this import
import { Case } from '../../../schemas';
import { CaseService } from '../../services/case.service';

@Component({
  selector: 'app-case-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IonicModule], // <--- Added IonicModule here
  templateUrl: './case-list.html',
  styleUrl: './case-list.css',
})
export class CaseListComponent implements OnInit {
  private caseService = inject(CaseService);
  private cdr = inject(ChangeDetectorRef);

  allCases: Case[] = [];
  filteredCases: Case[] = [];
  searchTerm = '';
  isLoading = false; // Add loading state

  private sortDirection: { [key: string]: 'asc' | 'desc' } = {};

  ngOnInit(): void {
    this.loadCases();
  }

  async loadCases(): Promise<void> {
    this.isLoading = true; // Set loading to true
    this.cdr.detectChanges(); // Force change detection to show loading indicator immediately
    try {
      this.allCases = await this.caseService.getCases();
      this.filteredCases = [...this.allCases];
      this.cdr.detectChanges(); // Manually trigger change detection
    } catch (error) {
      console.error('Error loading cases:', error);
    } finally {
      this.isLoading = false; // Set loading to false
      this.cdr.detectChanges(); // Force change detection to hide loading indicator immediately
    }
  }

  filterCases(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredCases = this.allCases.filter(c =>
      (c.employee_name?.toLowerCase() ?? '').includes(term) ||
      (c.category?.toLowerCase() ?? '').includes(term) ||
      (c.report_status?.toLowerCase() ?? '').includes(term)
    );
  }

  sort(field: keyof Case | 'employee_name'): void {
    const direction = this.sortDirection[field] === 'asc' ? 'desc' : 'asc';
    this.sortDirection = { [field]: direction };

    this.filteredCases.sort((a, b) => {
      let valA: any;
      let valB: any;

      if (field === 'employee_name') {
        valA = a.employee_name ?? '';
        valB = b.employee_name ?? '';
      } else {
        valA = a[field] ?? '';
        valB = b[field] ?? '';
      }

      if (valA < valB) return direction === 'asc' ? -1 : 1;
      if (valA > valB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  async deleteCase(id: number): Promise<void> {
    if (confirm('Are you sure you want to delete this case?')) {
      try {
        await this.caseService.deleteCase(id);
        this.loadCases(); // Refresh the list
      } catch (error) {
        console.error('Error deleting case:', error);
        alert('Failed to delete case.');
      }
    }
  }
}
