import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EncryptionService } from './encryption.service'; // Import the new EncryptionService
import { ChatMessage } from './schemas';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  private apiUrl = '/api/ai.php';
  private http = inject(HttpClient);
  private encryptionService = inject(EncryptionService); // Inject the EncryptionService

  public callAi(messages: ChatMessage[]): Observable<string> {
    const payload = JSON.stringify({ messages });
    const base64Payload = this.encryptionService.encrypt(payload); // Use the new EncryptionService

    return this.http.post(this.apiUrl, base64Payload, {
      headers: { 'Content-Type': 'text/plain' },
      responseType: 'text'
    });
  }
}
