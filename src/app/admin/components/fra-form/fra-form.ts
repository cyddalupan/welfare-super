import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Fra, Applicant } from '../../../schemas';
import { FraService } from '../../services/fra.service';
import { ApplicantService } from '../../services/applicant.service';

@Component({
  selector: 'app-fra-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './fra-form.html',
  styleUrls: ['./fra-form.css'],
})
export class FraFormComponent implements OnInit {
  private fraService = inject(FraService);
  private applicantService = inject(ApplicantService);
  public router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  fra: Partial<Fra> & { applicant_id?: number } = {};
  isEditMode = false;
  fraId: number | null = null;
  isLoading = false;
  applicants: Applicant[] = [];

  ngOnInit(): void {
    this.loadApplicants();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.fraId = +id;
      this.loadFraData(this.fraId);
    }
  }

  async loadApplicants(): Promise<void> {
    try {
      this.applicants = await this.applicantService.getApplicants();
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error loading applicants:', error);
    }
  }

  async loadFraData(id: number): Promise<void> {
    this.isLoading = true;
    this.cdr.detectChanges();
    try {
      const data = await this.fraService.getFraById(id);
      if (data) {
        this.fra = data;
        this.cdr.detectChanges();
      } else {
        this.router.navigate(['/admin/fras']);
      }
    } catch (error) {
      console.error('Error loading FRA data:', error);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  async saveFra(): Promise<void> {
    try {
      if (this.isEditMode && this.fraId) {
        await this.fraService.updateFra({ ...this.fra, id: this.fraId } as Fra);
      } else {
        await this.fraService.createFra(this.fra as Omit<Fra, 'id'>);
      }
      this.router.navigate(['/admin/fras']);
    } catch (error) {
      console.error('Error saving FRA:', error);
      alert('Failed to save FRA.');
    }
  }
}
