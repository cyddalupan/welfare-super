import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, ViewWillEnter } from '@ionic/angular';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonButton, IonIcon, IonContent, IonSpinner, IonList, IonItem, IonLabel, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AdminUsersService } from '../../services/admin-users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.css'],
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonButton,
  IonIcon,
  IonContent,
  IonSpinner,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardContent,
],
})
export class UserListComponent implements OnInit, ViewWillEnter {
  users: any[] = [];
  isAdmin = false;
  isLoading = false; // Add isLoading property

  private authService = inject(AuthService);
  private adminUsersService = inject(AdminUsersService);
  private router = inject(Router);
  private alertController = inject(AlertController);
  private cdr = inject(ChangeDetectorRef); // Inject ChangeDetectorRef

  ngOnInit() {
    this.checkAdminStatus();
    this.loadUsers();
  }

  ionViewWillEnter(): void {
    this.loadUsers();
  }

  checkAdminStatus() {
    this.isAdmin = this.authService.getUserType() === 'admin';
  }

  async loadUsers() {
    this.isLoading = true; // Set loading to true
    this.cdr.detectChanges(); // Trigger change detection
    try {
      this.users = await this.adminUsersService.getUsers();
      this.cdr.detectChanges(); // Trigger change detection immediately after data is set
    } catch (error) {
      console.error('Error loading users:', error);
      // Optionally show an alert to the user
    } finally {
      this.isLoading = false; // Set loading to false
      this.cdr.detectChanges(); // Trigger change detection
    }
  }

  editUser(userId: number) {
    this.router.navigate(['/admin/users/edit', userId]);
  }

  async deleteUser(userId: number) {
    if (!this.isAdmin) {
      this.presentAlert('Permission Denied', 'You do not have permission to delete users.');
      return;
    }

    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this user?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: async () => {
            try {
              await this.adminUsersService.deleteUser(userId);
              this.loadUsers(); // Reload users after deletion
            } catch (error) {
              console.error('Error deleting user:', error);
              this.presentAlert('Error', 'Failed to delete user.');
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  navigateToNewUser() {
    console.log('Attempting to navigate to /admin/users/new');
    this.router.navigate(['/admin/users/new']);
  }
}
