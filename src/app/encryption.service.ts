import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }

  public encrypt(data: string): string {
    const key = CryptoJS.enc.Hex.parse(environment.encryptionKey);
    // Generate a random IV for each encryption for security
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(data, key, { iv: iv });

    // Concatenate IV and ciphertext, then Base64 encode
    // The PHP backend expects the IV prepended to the binary ciphertext before Base64 encoding.
    const concatenated = iv.clone().concat(encrypted.ciphertext);
    return concatenated.toString(CryptoJS.enc.Base64);
  }
}
