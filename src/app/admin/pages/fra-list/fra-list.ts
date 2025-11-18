import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Fra } from '../../../schemas';
import { FraService } from '../../services/fra.service';

@Component({
  selector: 'app-fra-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './fra-list.html',
  styleUrl: './fra-list.css',
})
export class FraListComponent implements OnInit {
  private fraService = inject(FraService);
  private cdr = inject(ChangeDetectorRef);

  allFras: Fra[] = [];
  filteredFras: Fra[] = [];
  searchTerm = '';
  isLoading = false;

  private sortDirection: { [key: string]: 'asc' | 'desc' } = {};

  ngOnInit(): void {
    this.loadFras();
  }

  async loadFras(): Promise<void> {
    this.isLoading = true;
    this.cdr.detectChanges();
    try {
      this.allFras = await this.fraService.getFras();
      this.filterFras(); // Apply search term filter
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error loading FRAs:', error);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  filterFras(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredFras = this.allFras.filter(fra =>
      (fra.name?.toLowerCase() ?? '').includes(term) ||
      (fra.contact?.toLowerCase() ?? '').includes(term) ||
      (fra.country?.toLowerCase() ?? '').includes(term)
    );
  }

  sort(field: keyof Fra): void {
    const direction = this.sortDirection[field] === 'asc' ? 'desc' : 'asc';
    this.sortDirection = { [field]: direction };

    this.filteredFras.sort((a, b) => {
      const valA = a[field] ?? '';
      const valB = b[field] ?? '';
      if (valA < valB) return direction === 'asc' ? -1 : 1;
      if (valA > valB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  async deleteFra(id: number): Promise<void> {
    if (confirm('Are you sure you want to delete this FRA?')) {
      try {
        await this.fraService.deleteFra(id);
        this.loadFras(); // Refresh the list
      } catch (error) {
        console.error('Error deleting FRA:', error);
        alert('Failed to delete FRA.');
      }
    }
  }
}
