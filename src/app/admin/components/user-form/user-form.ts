import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonItem, IonInput, IonSelect, IonSelectOption, IonButton, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminUsersService } from '../../services/admin-users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonItem, IonInput, IonSelect, IonSelectOption, IonButton, IonCard, IonCardContent],
})
export class UserFormComponent implements OnInit {
  userId: number | null = null;
  userForm!: FormGroup;
  isEdit = false;

  private adminUsersService = inject(AdminUsersService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastController = inject(ToastController);
  private fb = inject(FormBuilder);

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id') ? Number(this.route.snapshot.paramMap.get('id')) : null;
    this.isEdit = !!this.userId;

    this.userForm = this.fb.group({
      full_name: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      password: ['', [this.isEdit ? Validators.nullValidator : Validators.required, Validators.maxLength(255)]],
      user_type: ['staff', Validators.required],
    });

    if (this.isEdit) {
      this.loadUser(this.userId!);
    }
  }

  async loadUser(id: number) {
    try {
      const user = await this.adminUsersService.getUserById(id);
      if (user) {
        this.userForm.patchValue({
          full_name: user.full_name,
          email: user.email,
          // Do not pre-fill password for security reasons
          user_type: user.user_type,
        });
        // Clear password field for security, as we don't want to pre-fill it
        this.userForm.get('password')?.setValue('');
      } else {
        this.presentToast('User not found.', 'danger');
        this.router.navigate(['/admin/users']);
      }
    } catch (error) {
      console.error('Error loading user:', error);
      this.presentToast('Error loading user details.', 'danger');
    }
  }

  async saveUser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.presentToast('Please fill all required fields correctly.', 'danger');
      return;
    }

    try {
      const user = this.userForm.value;
      if (this.isEdit) {
        await this.adminUsersService.updateUser(this.userId!, user);
        this.presentToast('User updated successfully!', 'success');
      } else {
        await this.adminUsersService.createUser(user);
        this.presentToast('User created successfully!', 'success');
      }
      this.router.navigate(['/admin/users']);
    } catch (error) {
      console.error('Error saving user:', error);
      this.presentToast('Failed to save user.', 'danger');
    }
  }

  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    toast.present();
  }
}
