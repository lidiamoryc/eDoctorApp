// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from '../auth.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(): boolean {
//     const currentUser = this.authService.getCurrentUser(); // Fetch the logged-in user

//     if (currentUser && currentUser.role === 'admin') {
//       return true; // Allow access if the user is an admin
//     } else {
//       this.router.navigate(['/auth/login']); // Redirect to login if not an admin
//       return false;
//     }
//   }
// }
