import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AbsenceComponent } from './absence/absence.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'calendar', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [authGuard()]
  },
  {
    path: 'absences',
    component: AbsenceComponent,
    canActivate: [authGuard(['doctor', 'admin'])]
  }
];
