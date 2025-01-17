import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

interface User {
  role: string;
}

export const authGuard = (allowedRoles?: string[]) => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.user$.pipe(
      take(1),
      map((user: User | null) => {
        if (!user) {
          router.navigate(['/login']);
          return false;
        }

        if (!allowedRoles) {
          return true;
        }

        if (allowedRoles.includes(user.role)) {
          return true;
        }

        router.navigate(['/calendar']);
        return false;
      })
    );
  };
};