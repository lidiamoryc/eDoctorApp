import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, map, switchMap } from 'rxjs';

export interface User {
  uid: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient';
  displayName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.doc<User>(`users/${user.uid}`).valueChanges().pipe(
            map(userData => userData || null)
          );
        }
        return from([null]);
      })
    );
  }

  async register(email: string, password: string, role: 'admin' | 'doctor' | 'patient', displayName: string): Promise<void> {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      if (credential.user) {
        await this.firestore.doc(`users/${credential.user.uid}`).set({
          uid: credential.user.uid,
          email: credential.user.email,
          role,
          displayName
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  isDoctor(): Observable<boolean> {
    return this.user$.pipe(
      map(user => user?.role === 'doctor' || user?.role === 'admin')
    );
  }

  isAdmin(): Observable<boolean> {
    return this.user$.pipe(
      map(user => user?.role === 'admin')
    );
  }
} 