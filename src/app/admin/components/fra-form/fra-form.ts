import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Fra } from '../../../schemas';
import { IonicModule } from '@ionic/angular';

import { FraService } from '../../services/fra.service';

@Component({
  selector: 'app-fra-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IonicModule, ReactiveFormsModule],
  templateUrl: './fra-form.html',
  styleUrls: ['./fra-form.css'],
})
export class FraFormComponent implements OnInit {
  private fraService = inject(FraService);
  public router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);

  fraForm!: FormGroup;
  isEditMode = false;
  fraId: number | null = null;
  isLoading = false;

  ngOnInit(): void {
    this.fraForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      contact: ['', [Validators.required, Validators.maxLength(255)]],
      address: ['', Validators.required],
      country: ['', [Validators.required, Validators.maxLength(50)]],
      agency_id: [null], // Assuming it's optional
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.fraId = +id;
      this.loadFraData(this.fraId);
    }
  }

  async loadFraData(id: number): Promise<void> {
    this.isLoading = true;
    this.cdr.detectChanges();
    try {
      const data = await this.fraService.getFraById(id);
      if (data) {
        this.fraForm.patchValue(data);
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
    if (this.fraForm.invalid) {
      this.fraForm.markAllAsTouched();
      // Optionally, add a toast message to inform the user
      // this.presentToast('Please fill all required fields correctly.', 'danger');
      return;
    }

    try {
      const fraData = this.fraForm.value;
      if (this.isEditMode && this.fraId) {
        await this.fraService.updateFra({ ...fraData, id: this.fraId } as Fra);
      } else {
        await this.fraService.createFra(fraData as Omit<Fra, 'id'>);
      }
      this.router.navigate(['/admin/fras']);
    } catch (error) {
      console.error('Error saving FRA:', error);
      alert('Failed to save FRA.');
    }
  }
}
