import { Routes } from '@angular/router';
import { AdminLoginComponent } from './pages/admin-login/admin-login';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard';
import { authGuard } from './guards/auth.guard';
import { ApplicantListComponent } from './pages/applicant-list/applicant-list';
import { ApplicantFormComponent } from './components/applicant-form/applicant-form';
import { CaseListComponent } from './pages/case-list/case-list';
import { CaseFormComponent } from './pages/case-form/case-form';

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
      { path: 'cases', component: CaseListComponent },
      { path: 'cases/new', component: CaseFormComponent },
      { path: 'cases/edit/:id', component: CaseFormComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
