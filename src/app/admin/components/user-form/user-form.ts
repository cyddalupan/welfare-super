import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminUsersService } from '../../services/admin-users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class UserFormComponent implements OnInit {
  userId: number | null = null;
  user = {
    full_name: '',
    email: '',
    password: '',
    user_type: 'staff', // Default to staff
  };
  isEdit = false;

  private adminUsersService = inject(AdminUsersService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastController = inject(ToastController);

  ngOnInit() {
    console.log('UserFormComponent ngOnInit called'); // Debugging line
    this.userId = this.route.snapshot.paramMap.get('id') ? Number(this.route.snapshot.paramMap.get('id')) : null;
    this.isEdit = !!this.userId;

    if (this.isEdit) {
      this.loadUser(this.userId!);
    }
  }

  async loadUser(id: number) {
    try {
      this.user = await this.adminUsersService.getUserById(id);
      // Clear password for security, as we don't want to pre-fill it
      this.user.password = '';
    } catch (error) {
      console.error('Error loading user:', error);
      this.presentToast('Error loading user details.', 'danger');
    }
  }

  async saveUser() {
    try {
      if (this.isEdit) {
        await this.adminUsersService.updateUser(this.userId!, this.user);
        this.presentToast('User updated successfully!', 'success');
      } else {
        await this.adminUsersService.createUser(this.user);
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
