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
  private encryptionIv: string;

  constructor(private http: HttpClient) {
    this.encryptionKey = environment.encryptionKey;
    this.encryptionIv = environment.encryptionIv;
  }

  login(lastName: string, passportNumber: string): Observable<boolean> {
    const query = `SELECT id FROM employee_employee WHERE last_name = ? AND passport_number = ?`;
    const params = [lastName, passportNumber];

    const payload = { query, params };
    const encryptedPayload = this.encryptPayload(JSON.stringify(payload));

    return this.http.post<any>(this.apiUrl, { data: encryptedPayload }).pipe(
      map(response => {
        if (response && response.length > 0 && response[0].id) {
          localStorage.setItem('user_id', response[0].id);
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
    const key = CryptoJS.enc.Utf8.parse(this.encryptionKey);
    const iv = CryptoJS.enc.Utf8.parse(this.encryptionIv);
    const encrypted = CryptoJS.AES.encrypt(payload, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }
}
