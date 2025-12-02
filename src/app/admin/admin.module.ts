import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminLoginComponent } from './pages/admin-login/admin-login';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard';
import { ApplicantListComponent } from './pages/applicant-list/applicant-list';
import { ApplicantFormComponent } from './components/applicant-form/applicant-form';
import { CaseListComponent } from './pages/case-list/case-list';
import { CaseFormComponent } from './pages/case-form/case-form';
import { FraListComponent } from './pages/fra-list/fra-list';
import { FraFormComponent } from './components/fra-form/fra-form';
import { ReferralListComponent } from './pages/referral-list/referral-list'; // New import
import { ReferralFormComponent } from './pages/referral-form/referral-form'; // New import
import { SidebarComponent } from './components/sidebar/sidebar';
import { UserListComponent } from './pages/user-list/user-list';
import { UserFormComponent } from './components/user-form/user-form';
import { AnnouncementListComponent } from './pages/announcement-list/announcement-list.component'; // New import
import { AnnouncementFormComponent } from './pages/announcement-form/announcement-form.component'; // New import
import { ManualChatComponent } from './pages/manual-chat/manual-chat'; // Placeholder for new component
import { ApplicantComplaintsListComponent } from './pages/applicant-complaints-list/applicant-complaints-list'; // New import
import { AdminUsersService } from './services/admin-users.service';

import { authGuard } from './guards/auth.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'login',
    component: AdminLoginComponent,
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'applicants', component: ApplicantListComponent },
      { path: 'applicants/status/:status', component: ApplicantListComponent },
      { path: 'applicants/new', component: ApplicantFormComponent },
      { path: 'applicants/edit/:id', component: ApplicantFormComponent },
      { path: 'applicants/complaints', component: ApplicantComplaintsListComponent }, // New route
      { path: 'cases', component: CaseListComponent },
      { path: 'cases/new', component: CaseFormComponent },
      { path: 'cases/edit/:id', component: CaseFormComponent },
      { path: 'fras', component: FraListComponent },
      { path: 'fras/new', component: FraFormComponent },
      { path: 'fras/edit/:id', component: FraFormComponent },
      { path: 'referrals', component: ReferralListComponent }, // New route
      { path: 'referrals/new', component: ReferralFormComponent }, // New route
      { path: 'referrals/edit/:id', component: ReferralFormComponent }, // New route
      { path: 'users', component: UserListComponent },
      { path: 'users/new', component: UserFormComponent },
      { path: 'users/edit/:id', component: UserFormComponent },
      { path: 'announcements', component: AnnouncementListComponent }, // New route
      { path: 'announcements/new', component: AnnouncementFormComponent }, // New route
      { path: 'announcements/edit/:id', component: AnnouncementFormComponent }, // New route
      { path: 'manual-chat/:id', component: ManualChatComponent }, // New route for manual chat with applicant
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(ADMIN_ROUTES),
    AdminLoginComponent,
    AdminLayoutComponent,
    AdminDashboardComponent,
    ApplicantListComponent,
    ApplicantFormComponent,
    CaseListComponent,
    CaseFormComponent,
    FraListComponent,
    FraFormComponent,
    ReferralListComponent, // New component import
    ReferralFormComponent, // New component import
    SidebarComponent,
    UserListComponent,
    UserFormComponent,
    AnnouncementListComponent, // New component import
    AnnouncementFormComponent, // New component import
    ManualChatComponent, // New component import
    ApplicantComplaintsListComponent // New component import
  ],
  declarations: [],
  providers: [
    AdminUsersService
  ]
})
export class AdminModule { }
