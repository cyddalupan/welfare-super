import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EncryptionService } from '../../../app/encryption.service'; // Adjust path if necessary
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminUsersService {
  private apiUrl = 'api/database.php'; // Assuming this handles admin user CRUD
  private http = inject(HttpClient);
  private encryptionService = inject(EncryptionService);

  async executeQuery(query: string, params: any[] = []): Promise<any> {
    const payload = { query, params };
    const encryptedPayload = await this.encryptionService.encrypt(JSON.stringify(payload));
    return lastValueFrom(this.http.post<any>(this.apiUrl, encryptedPayload));
  }

  async getUsers(): Promise<any[]> {
    const query = 'SELECT id, full_name, email, user_type, created_at, updated_at FROM admin_users';
    return await this.executeQuery(query);
  }

  async getUserById(id: number): Promise<any> {
    const query = 'SELECT id, full_name, email, user_type, created_at, updated_at FROM admin_users WHERE id = ?';
    const result = await this.executeQuery(query, [id]);
    return result[0]; // Assuming it returns an array of one user
  }

  async createUser(user: { full_name: string; email: string; password?: string; user_type: string }): Promise<any> {
    const query = 'INSERT INTO admin_users (full_name, email, password, user_type) VALUES (?, ?, ?, ?)';
    // IMPORTANT: Password hashing should be done on the backend.
    // For now, sending as plain text as per user's instruction to ignore hashing for this task.
    // This is a SECURITY RISK.
    return await this.executeQuery(query, [user.full_name, user.email, user.password, user.user_type]);
  }

  async updateUser(id: number, user: { full_name: string; email: string; password?: string; user_type: string }): Promise<any> {
    let query = 'UPDATE admin_users SET full_name = ?, email = ?, user_type = ?, updated_at = NOW() WHERE id = ?';
    let params: any[] = [user.full_name, user.email, user.user_type, id];

    if (user.password) {
      // IMPORTANT: Password hashing should be done on the backend.
      // For now, sending as plain text as per user's instruction to ignore hashing for this task.
      // This is a SECURITY RISK.
      query = 'UPDATE admin_users SET full_name = ?, email = ?, password = ?, user_type = ?, updated_at = NOW() WHERE id = ?';
      params = [user.full_name, user.email, user.password, user.user_type, id];
    }
    return await this.executeQuery(query, params);
  }

  async deleteUser(id: number): Promise<any> {
    const query = 'DELETE FROM admin_users WHERE id = ?';
    return await this.executeQuery(query, [id]);
  }
}
