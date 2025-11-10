import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private apiUrl = '/api/database.php';

  constructor(private http: HttpClient) { }

  private encrypt(data: string): string {
    const key = CryptoJS.enc.Hex.parse(environment.encryptionKey);
    // Generate a random IV for each encryption for security
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(data, key, { iv: iv });

    // Concatenate IV and ciphertext, then Base64 encode
    const concatenated = iv.clone().concat(encrypted.ciphertext);
    return concatenated.toString(CryptoJS.enc.Base64);
  }

  public query(query: string, params: any[] = []): Observable<any> {
    const payload = JSON.stringify({ query, params });
    const base64Payload = this.encrypt(payload);

    return this.http.post(this.apiUrl, base64Payload, {
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
