import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat';
import { AdminLoginComponent } from './admin/pages/admin-login/admin-login'; // Import AdminLoginComponent

export const routes: Routes = [
  // { path: '', component: ChatComponent }, // Temporarily remove ChatComponent from root
  { path: '', redirectTo: '/admin/login', pathMatch: 'full' }, // Redirect root to admin login for testing
  { path: 'admin/login', component: AdminLoginComponent }, // Directly load AdminLoginComponent
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
  }
];