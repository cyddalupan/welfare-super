import { Routes } from '@angular/router';
import { AdminLoginComponent } from './pages/admin-login/admin-login';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard';
import { authGuard } from './guards/auth.guard';
import { ApplicantListComponent } from './pages/applicant-list/applicant-list';
import { ApplicantFormComponent } from './components/applicant-form/applicant-form';
import { CaseListComponent } from './pages/case-list/case-list';
import { CaseFormComponent } from './pages/case-form/case-form';
import { FraListComponent } from './pages/fra-list/fra-list'; // Import FraListComponent
import { FraFormComponent } from './components/fra-form/fra-form'; // Import FraFormComponent

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
      { path: 'fras', component: FraListComponent }, // New route for FRA list
      { path: 'fras/new', component: FraFormComponent }, // New route for adding FRA
      { path: 'fras/edit/:id', component: FraFormComponent }, // New route for editing FRA
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
