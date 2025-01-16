import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgPlural } from '@angular/common';

export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  // Method to verify user credentials
  login(username: string, password: string): Observable<User | null> {
    return new Observable((observer) => {
      this.http.get<User[]>(this.apiUrl).subscribe({
        next: (users) => {
          const user = users.find(
            (u) => u.username === username && u.password === password
          );
          observer.next(user || null); // Return user if found, otherwise null
          observer.complete();
        },
        error: (err) => observer.error(err),
      });
    });
  }

  checkUsernameExists(username: string): Observable<boolean> {
    return new Observable((observer) => {
      this.http.get<User[]>(this.apiUrl).subscribe({
        next: (users) => {
          const exists = users.some((u) => u.username === username);
          observer.next(exists); // Return true if username exists, otherwise false
          observer.complete();
        },
        error: (err) => observer.error(err),
      });
    });
  }

  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user); // Add user to db.json
  }
}
