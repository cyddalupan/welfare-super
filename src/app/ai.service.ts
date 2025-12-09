import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError, map } from 'rxjs'; // Added map
import { EncryptionService } from './encryption.service';
import { ChatMessage } from './schemas';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  private apiUrl = '/api/ai.php';
  private http = inject(HttpClient);
  private encryptionService = inject(EncryptionService);

  public callAi(aiPayload: ChatMessage[], employeeId: number | null): Observable<string> {
    const payload = JSON.stringify({ messages: aiPayload, employee_id: employeeId });
    const base64Payload = this.encryptionService.encrypt(payload);

    return this.http.post(this.apiUrl, base64Payload, {
      headers: { 'Content-Type': 'text/plain' },
      responseType: 'text'
    }).pipe(
      map(response => { // Use map to transform the response or throw an error
        if (this.isRawPhpResponse(response)) {
          console.error('Detected raw PHP response from server:', response);
          throw new Error('An unexpected server error occurred. Please try again later.'); // User-friendly error
        }
        return response;
      }),
      catchError(error => {
        console.error('AiService.callAi: Error during AI call:', error);
        // If the error was our custom one, rethrow. Otherwise, provide a generic error message.
        if (error.message === 'An unexpected server error occurred. Please try again later.') {
          return throwError(() => error);
        }
        // For other network/HTTP errors, provide a generic message.
        return throwError(() => new Error('A network error occurred. Please check your internet connection and try again.'));
      })
    );
  }

  // Helper function to detect raw PHP content
  private isRawPhpResponse(responseText: string): boolean {
    // Look for common PHP markers
    const phpMarkers = [
      '<?php',
      'curl_init',
      'CURLOPT_URL',
      'json_encode',
      'file_get_contents(\'php://input\')',
      '$ch = curl_init();' // More specific to the user's snippet
    ];

    for (const marker of phpMarkers) {
      if (responseText.includes(marker)) {
        return true;
      }
    }
    return false;
  }
}
