import { Routes } from '@angular/router';

export const routes: Routes = [
  // Lazy load the Calendar Module
  {
    path: 'calendar',
    loadChildren: () =>
      import('./calendar/calendar.module').then((m) => m.CalendarModule),
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
