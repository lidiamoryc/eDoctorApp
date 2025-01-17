import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, switchMap, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  uid: string;      // Firebase UID
  email: string;
  displayName?: string;
  role?: string;
  photoURL?: string;
  emailVerified?: boolean;
  id?: string;      // For backward compatibility with existing templates
  createdAt?: string;
  lastLoginAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  // Sign up with email/password
  signup(email: string, password: string): Observable<any> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
      switchMap(credential => {
        if (credential.user) {
          const user: User = {
            uid: credential.user.uid,
            email: credential.user.email!,
            role: 'user', // Default role
            emailVerified: credential.user.emailVerified,
            id: credential.user.uid, // For backward compatibility
            createdAt: new Date().toISOString(),
            lastLoginAt: new Date().toISOString()
          };
          // Create user document in Firestore
          return from(this.firestore.doc(`users/${user.uid}`).set(user)).pipe(
            map(() => credential)
          );
        }
        throw new Error('User creation failed');
      })
    );
  }

  // Sign in with email/password
  login(email: string, password: string): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      switchMap(credential => {
        if (credential.user) {
          // Update last login timestamp
          return from(this.firestore.doc(`users/${credential.user.uid}`).update({
            lastLoginAt: new Date().toISOString()
          })).pipe(
            map(() => credential)
          );
        }
        return of(credential);
      })
    );
  }

  // Sign out
  logout(): Observable<void> {
    return from(this.afAuth.signOut());
  }

  // Get current user
  getCurrentUser(): Observable<any> {
    return this.afAuth.authState;
  }

  // Check if user is logged in
  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => !!user)
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.firestore.collection<User>('users').valueChanges();
  }
}
