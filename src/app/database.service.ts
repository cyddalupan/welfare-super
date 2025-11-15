import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { environment } from '../environments/environment';
import { ChatMessage } from './schemas';
import { GET_CHAT_HISTORY, INSERT_CHAT_MESSAGE } from './queries';

// Define a type for the raw chat history from the database
interface RawChatMessage {
  message: string;
  sender: 'Employee' | 'AI';
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
    return this.query(GET_CHAT_HISTORY, [employeeId]).pipe(
      map((response: RawChatMessage[]) => {
        if (!response) {
          return [];
        }
        const messages: ChatMessage[] = response.map(rawMsg => ({
          role: rawMsg.sender === 'Employee' ? 'user' : 'assistant',
          content: rawMsg.message
        }));
        // The query returns the latest 20, so we need to reverse them to show in chronological order
        return messages.reverse();
      })
    );
  }

  public saveChatMessage(message: ChatMessage, employeeId: number): Observable<any> {
    const sender = message.role === 'user' ? 'Employee' : 'AI';
    return this.query(INSERT_CHAT_MESSAGE, [employeeId, message.content, sender]);
  }
}
