import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js'; // For AES encryption
import { environment } from '../environments/environment'; // Import environment

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'api/database.php'; // Path to your PHP backend
  private encryptionKey: string;
  constructor(private http: HttpClient) {
    this.encryptionKey = environment.encryptionKey;
  }

  login(lastName: string, passportNumber: string): Observable<boolean> {
    const query = `SELECT id FROM employee_employee WHERE last_name = ? AND passport_number = ?`;
    const params = [lastName, passportNumber];

    const payload = { query, params };
    const encryptedPayload = this.encryptPayload(JSON.stringify(payload));

    // Send the encrypted payload directly as the request body
    console.log('Encrypted Payload from Angular:', encryptedPayload); // ADDED FOR DEBUGGING
    return this.http.post<any>(this.apiUrl, encryptedPayload).pipe(
      map(response => {
        if (response && response.success && response.data && response.data.length > 0 && response.data[0].id) {
          localStorage.setItem('user_id', response.data[0].id);
          return true;
        }
        return false;
      }),
      catchError(error => {
        console.error('Login API call failed:', error);
        return of(false); // Return false on error
      })
    );
  }

  private encryptPayload(payload: string): string {
    const key = CryptoJS.enc.Hex.parse(this.encryptionKey);
    // Generate a random IV for each encryption
    const iv = CryptoJS.lib.WordArray.random(16); // 16 bytes for AES-256-CBC

    const encrypted = CryptoJS.AES.encrypt(payload, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    // Concatenate IV and ciphertext, then Base64 encode
    const combined = CryptoJS.lib.WordArray.create().concat(iv).concat(encrypted.ciphertext);
    return combined.toString(CryptoJS.enc.Base64);
  }
}
