import { Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login';
import { ChatComponent } from './chat/chat';

export const routes: Routes = [
    { path: '', component: ChatComponent },
    { path: 'admin/login', component: AdminLoginComponent }
];