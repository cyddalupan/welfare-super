import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterModule } from '@angular/router';
import { IonApp, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonRouterOutlet, IonIcon, IonBadge } from '@ionic/angular/standalone';
import { SidebarComponent } from '../../components/sidebar/sidebar';
import { ApplicantService } from '../../services/applicant.service'; // Import ApplicantService

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent,
    IonApp,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonMenuButton,
    IonRouterOutlet,
    IonIcon, // Add IonIcon
    IonBadge, // Add IonBadge
  ],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayoutComponent implements OnInit {
  private applicantService = inject(ApplicantService); // Inject ApplicantService
  complaintCount: number = 0;

  ngOnInit(): void {
    this.loadComplaintCount();
  }

  async loadComplaintCount(): Promise<void> {
    this.complaintCount = await this.applicantService.countApplicantsWithComplaints();
  }
}
