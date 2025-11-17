import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  async login(): Promise<void> {
    this.errorMessage = '';
    console.log('Attempting login for:', this.email); // DEBUG
    try {
      const success = await this.authService.login(this.email, this.password);
      console.log('AuthService.login returned success:', success); // DEBUG
      if (success) {
        console.log('Login successful, navigating to dashboard.'); // DEBUG
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.errorMessage = 'Invalid email or password.';
        console.log('Login failed, error message set:', this.errorMessage); // DEBUG
      }
    } catch (error) {
      this.errorMessage = 'An unexpected error occurred. Please try again.';
      console.error('Login error in AdminLoginComponent:', error); // DEBUG
    }
  }
}
