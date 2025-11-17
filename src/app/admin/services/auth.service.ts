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
      console.log('AuthService: Querying database for email:', email); // DEBUG
      const result = await firstValueFrom(this.db.query(GET_ADMIN_USER_BY_EMAIL, [email])) as AdminUser[];
      console.log('AuthService: Database query result:', result); // DEBUG

      if (result && result.length > 0) {
        const user = result[0];
        console.log('AuthService: User found:', user); // DEBUG
        // NOTE: This is an insecure plaintext password comparison as requested.
        if (user.password === password) {
          console.log('AuthService: Password match. Login successful.'); // DEBUG
          const token = JSON.stringify({ userId: user.id, email: user.email });
          localStorage.setItem(this.TOKEN_KEY, token);
          return true;
        } else {
          console.log('AuthService: Password mismatch.'); // DEBUG
        }
      } else {
        console.log('AuthService: No user found for email:', email); // DEBUG
      }
      return false;
    } catch (error) {
      console.error('AuthService: Error during login:', error); // DEBUG
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
