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
import { SidebarComponent } from './components/sidebar/sidebar'; // Assuming sidebar is part of admin module

import { authGuard } from './guards/auth.guard';

const ADMIN_ROUTES: Routes = [
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
      { path: 'fras', component: FraListComponent },
      { path: 'fras/new', component: FraFormComponent },
      { path: 'fras/edit/:id', component: FraFormComponent },
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
    SidebarComponent
  ],
  declarations: [],
  providers: [
    // Providers specific to the admin module, if any
  ]
})
export class AdminModule { }
