import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule, Platform } from '@ionic/angular'; // <--- Added this import
import { DatabaseService } from './database.service';
import { AiService } from './ai.service';
import { ChatMessage } from './schemas';
import { PushNotifications } from '@capacitor/push-notifications';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, IonicModule], // <--- Added IonicModule here
  templateUrl: './app.component.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  title = 'welfare-super';


  constructor(
    private databaseService: DatabaseService,
    private aiService: AiService,
    private platform: Platform
  ) {
    this.initializeApp();
  }

  ngOnInit(): void {
    // Dummy code removed
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Only register for push on native Android/iOS
      if (this.platform.is('android') || this.platform.is('ios')) {
        this.registerPush();
      }
    });
  }

  registerPush() {
    // Android will just grant permissions without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Google to receive push via FCM
        PushNotifications.register();
      } else {
        // Handle denied permission
        console.log('Push permission denied:', result.receive);
      }
    });

    // Add listeners for registration token and errors
    PushNotifications.addListener('registration', (token) => {
          // THIS IS THE DEVICE TOKEN YOU NEED!
          // CRITICAL: You must send this token to your backend/server to be stored
          // so you can send targeted notifications later.
          // IMPORTANT: The employeeId should come from the authenticated user.
          // For demonstration purposes, we are using a placeholder employeeId (e.g., 1).
          const placeholderEmployeeId = 1;
          this.databaseService.savePushToken(placeholderEmployeeId, token.value).subscribe({
            next: (response) => {
              console.log('Push token saved successfully:', response);
            },
            error: (error) => {
              console.error('Error saving push token:', error);
            }
          });
        });
    PushNotifications.addListener('registrationError', (error) => {
      console.log('Registration error: ' + JSON.stringify(error));
    });
  }
}
 