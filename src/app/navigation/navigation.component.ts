import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../services/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <span>Medical Calendar</span>
      <span class="spacer"></span>
      <ng-container *ngIf="user$ | async as user">
        <span class="user-info">{{ user.displayName }} ({{ user.role }})</span>
        <button mat-button (click)="logout()">Logout</button>
      </ng-container>
    </mat-toolbar>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    .user-info {
      margin-right: 1rem;
      font-size: 0.9rem;
    }
  `]
})
export class NavigationComponent {
  user$: Observable<User | null>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.user$ = this.authService.user$;
  }

  async logout() {
    try {
      await this.authService.logout();
      await this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
} 