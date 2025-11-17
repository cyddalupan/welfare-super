import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat';

export const routes: Routes = [
  { path: '', component: ChatComponent },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
  }
];