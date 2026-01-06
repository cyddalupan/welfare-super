import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonList, IonListHeader, IonLabel, IonMenuToggle, IonItem, IonFooter, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';
import { ApplicantService } from '../../services/applicant.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule, IonList, IonListHeader, IonLabel, IonMenuToggle, IonItem, IonFooter, IonToolbar, IonButton],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private applicantService = inject(ApplicantService);

  isApplicantMenuOpen = false;
  applicantStatuses: string[] = [];
  isAdmin: boolean = false; // New property for admin status

  ngOnInit(): void {
    this.applicantService.getStatuses().then(statuses => {
      this.applicantStatuses = statuses.filter(status => status !== 'RESOLVED');
    });
    this.isAdmin = this.authService.getUserType() === 'admin'; // Initialize isAdmin
  }

  toggleApplicantMenu(): void {
    this.isApplicantMenuOpen = !this.isApplicantMenuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}
