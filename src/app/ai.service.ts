import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs'; // Added tap, catchError, throwError
import { EncryptionService } from './encryption.service'; // Import the new EncryptionService
import { ChatMessage } from './schemas';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  private apiUrl = '/api/ai.php';
  private http = inject(HttpClient);
  private encryptionService = inject(EncryptionService); // Inject the EncryptionService

  public callAi(aiPayload: ChatMessage[], employeeId: number | null): Observable<string> {
    const payload = JSON.stringify({ messages: aiPayload, employee_id: employeeId });
    const base64Payload = this.encryptionService.encrypt(payload);

    return this.http.post(this.apiUrl, base64Payload, {
      headers: { 'Content-Type': 'text/plain' },
      responseType: 'text'
    }).pipe(
      catchError(error => {
        console.error('AiService.callAi: Error during AI call:', error); // Keep error logs
        return throwError(() => error);
      })
    );
  }
}
