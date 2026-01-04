import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { environment } from '../environments/environment';
import { ChatMessage } from './schemas';
import { GET_APPLICANT_CHAT_HISTORY, INSERT_APPLICANT_CHAT_MESSAGE, INSERT_APPLICANT_MEMORY, GET_APPLICANT_MEMORIES, UPDATE_AI_ENABLED_UNTIL, GET_APPLICANT_AI_ENABLED_UNTIL, GET_APPLICANT_MAIN_STATUS, UPDATE_EMPLOYEE_PUSH_TOKEN } from './queries';

// Define a type for the raw chat history from the database
interface RawChatMessage {
  message: string;
  sender: 'Employee' | 'AI';
  timestamp: string; // Added timestamp
}

// Define a type for the raw memory from the database
interface RawMemory {
  note: string;
}

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

  public getChatHistory(employeeId: number): Observable<ChatMessage[]> {
    return this.query(GET_APPLICANT_CHAT_HISTORY, [employeeId]).pipe(
      map((response: any) => {
        // The API might return {success: true, data: [...]}, so we need to handle that structure.
        const responseData = (response && response.data) ? response.data : response;

        if (!Array.isArray(responseData)) {
          console.error('Chat history response is not a valid array:', responseData);
          return []; // Return empty array to prevent breaking the UI
        }

        const messages: ChatMessage[] = responseData.map((rawMsg: RawChatMessage) => {
          return {
            role: rawMsg.sender === 'Employee' ? 'user' : 'assistant',
            content: rawMsg.message,
            timestamp: rawMsg.timestamp
          };
        });
        
        // The query returns the latest 20, so we need to reverse them to show in chronological order
        return messages.reverse();
      })
    );
  }

  public saveChatMessage(message: ChatMessage, employeeId: number, agencyId: number): Observable<any> {
    const sender = message.role === 'user' ? 'Employee' : 'AI';
    // The timestamp is now passed as a parameter to the query
    return this.query(INSERT_APPLICANT_CHAT_MESSAGE, [employeeId, agencyId, message.content, sender, message.timestamp]);
  }

  public formatLocalToMySQLDatetime(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  public disableAiForApplicant(applicantId: number, durationMinutes: number): Observable<any> {
    const futureDate = new Date();
    futureDate.setMinutes(futureDate.getMinutes() + durationMinutes);
    const futureTimestamp = this.formatLocalToMySQLDatetime(futureDate);

    return this.query(UPDATE_AI_ENABLED_UNTIL, [futureTimestamp, applicantId]);
  }

  public saveApplicantAiEnabledUntil(applicantId: number, timestamp: Date | null): Observable<any> {
    const formattedTimestamp = timestamp ? this.formatLocalToMySQLDatetime(timestamp) : null;
    return this.query(UPDATE_AI_ENABLED_UNTIL, [formattedTimestamp, applicantId]);
  }
  public getApplicantAiEnabledUntil(applicantId: number): Observable<string | null> {
    return this.query(GET_APPLICANT_AI_ENABLED_UNTIL, [applicantId]).pipe(
      map((response: any) => {
        if (response && response.data && response.data.length > 0) {
          return response.data[0].ai_enabled_until;
        }
        return null;
      })
    );
  }

  public getApplicantMainStatus(applicantId: number): Observable<string | null> {
    return this.query(GET_APPLICANT_MAIN_STATUS, [applicantId]).pipe(
      map((response: any) => {
        if (response && response.data && response.data.length > 0) {
          return response.data[0].main_status;
        }
        return null;
      })
    );
  }

  public saveEmployeeMemory(employeeId: number, note: string): Observable<any> {
    return this.query(INSERT_APPLICANT_MEMORY, [employeeId, note]);
  }

  public getEmployeeMemories(employeeId: number): Observable<string[]> {
    return this.query(GET_APPLICANT_MEMORIES, [employeeId]).pipe(
      map((response: any) => {
        const responseData = (response && response.data) ? response.data : response;

        if (!Array.isArray(responseData)) {
          console.error('Employee memories response is not a valid array:', responseData);
          return [];
        }

        return responseData.map((rawMemory: RawMemory) => rawMemory.note);
      })
    );
  }

  public savePushToken(employeeId: number, token: string): Observable<any> {
    return this.query(UPDATE_EMPLOYEE_PUSH_TOKEN, [token, employeeId]);
  }
}
