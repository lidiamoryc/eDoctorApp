import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // Lazy load the Calendar Module
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule),
    canActivate: [AuthGuard]
  },
  // Lazy load the Auth Module
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule),
  },
  // Default route redirects to the login page
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },

  {
    path: 'users',
    loadChildren: () =>
      import('./users-list/users.module').then(m => m.UsersModule)
  },
];
