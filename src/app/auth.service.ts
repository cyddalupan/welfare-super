import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js'; // For AES encryption
import { environment } from '../environments/environment'; // Import environment
import { LOGIN_APPLICANT_QUERY } from './queries'; // Import the login query

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
    const processedLastName = lastName.trim().toLowerCase();
    const processedPassportNumber = passportNumber.trim().toLowerCase();

    const query = LOGIN_APPLICANT_QUERY;
    const params = [processedLastName, processedPassportNumber];

    const payload = { query, params };
    const encryptedPayload = this.encryptPayload(JSON.stringify(payload));

    // Send the encrypted payload directly as the request body
    return this.http.post<any>(this.apiUrl, encryptedPayload).pipe(
      map(response => {
        console.log('Login response data:', response?.data[0]); // CRITICAL DEBUG LOG
        if (response && response.success && response.data && response.data.length > 0 && response.data[0].id) {
          localStorage.setItem('user_id', response.data[0].id);
          localStorage.setItem('agency_id', response.data[0].agency_id); // Also store agency_id
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

  public logout(): void {
    localStorage.removeItem('user_id');
    localStorage.removeItem('agency_id');
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
