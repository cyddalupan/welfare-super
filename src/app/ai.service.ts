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
    console.log('AiService.callAi: AI service called.'); // Log invocation
    const payload = JSON.stringify({ messages: aiPayload, employee_id: employeeId });
    console.log('AiService.callAi: Payload before encryption:', payload); // Log payload
    const base64Payload = this.encryptionService.encrypt(payload);

    return this.http.post(this.apiUrl, base64Payload, {
      headers: { 'Content-Type': 'text/plain' },
      responseType: 'text'
    }).pipe(
      tap(response => console.log('AiService.callAi: Raw response from backend:', response)), // Log response
      catchError(error => {
        console.error('AiService.callAi: Error during AI call:', error); // Log errors
        return throwError(() => error);
      })
    );
  }
}
