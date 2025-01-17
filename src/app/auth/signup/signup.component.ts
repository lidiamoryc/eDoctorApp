import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  email = '';
  password = '';
  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup(): void {
    this.authService.signup(this.email, this.password).subscribe({
      next: () => {
        this.successMessage = 'Account created successfully!';
        this.errorMessage = '';
        setTimeout(() => this.router.navigate(['/auth/login']), 2000);
      },
      error: (error) => {
        console.error('Signup error', error);
        this.successMessage = '';
        this.errorMessage = this.getErrorMessage(error.code);
      },
    });
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'Email already exists. Please use a different email.';
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/operation-not-allowed':
        return 'Email/password accounts are not enabled. Please contact support.';
      case 'auth/weak-password':
        return 'Password is too weak. Please use a stronger password.';
      default:
        return 'An error occurred during signup. Please try again.';
    }
  }
}
