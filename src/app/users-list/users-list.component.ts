import { Component } from '@angular/core';
import { AuthService, User } from '../auth/auth.service';
import { UsersModule } from './users.module';

@Component({
  selector: 'app-user-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UserListComponent {
  users: User[] = [];
  isLoading: boolean = true;

  constructor(private authService: AuthService, private usersModule: UsersModule) {
    this.fetchUsers();
  }

  private fetchUsers(): void {
    this.authService.getAllUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error fetching users:', error);
        this.isLoading = false;
      },
    });
  }
}
