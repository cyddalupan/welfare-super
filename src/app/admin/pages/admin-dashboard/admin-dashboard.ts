import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // <--- Added this import

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [IonicModule], // <--- Added IonicModule here
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboardComponent {

}
