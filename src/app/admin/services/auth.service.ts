import { Injectable, inject } from '@angular/core';
import { DatabaseService } from '../../database.service';
import { GET_ADMIN_USER_BY_EMAIL } from '../../queries';
import { AdminUser } from '../../schemas';
import { firstValueFrom } from 'rxjs'; // Import firstValueFrom

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private db = inject(DatabaseService);
  private readonly TOKEN_KEY = 'admin_auth_token';

  async login(email: string, password: string): Promise<boolean> {
    try {
      const result = await firstValueFrom(this.db.query(GET_ADMIN_USER_BY_EMAIL, [email])) as AdminUser[];
      if (result && result.length > 0) {
        const user = result[0];
        // NOTE: This is an insecure plaintext password comparison as requested.
        if (user.password === password) {
          // In a real app, generate a proper JWT token.
          // For this implementation, we'll store a simple placeholder token.
          const token = JSON.stringify({ userId: user.id, email: user.email });
          localStorage.setItem(this.TOKEN_KEY, token);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): AdminUser | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      try {
        return JSON.parse(token);
      } catch (e) {
        return null;
      }
    }
    return null;
  }
}
