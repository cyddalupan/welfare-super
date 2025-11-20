import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; // <--- Added this import
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule], // <--- Added IonicModule here
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef); // Inject ChangeDetectorRef

  async login(): Promise<void> {
    this.errorMessage = '';
    try {
      const success = await this.authService.login(this.email, this.password);
      if (success) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.errorMessage = 'Invalid email or password.';
        this.cdr.detectChanges(); // Manually trigger change detection
      }
    } catch (error) {
      this.errorMessage = 'An unexpected error occurred. Please try again.';
      console.error('Login error:', error);
      this.cdr.detectChanges(); // Manually trigger change detection
    }
  }
}
