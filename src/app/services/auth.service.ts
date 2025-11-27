import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, user } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  // Observable of current user (null if not logged in)
  user$ = user(this.auth);

  // Sign in (returns Promise)
  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Register
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Sign out and redirect to landing
  async logout() {
    await signOut(this.auth);
    await this.router.navigate(['/']);
  }

  // Password reset
  resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  // Helper to get current user (Promise)
  currentUser() {
    return this.auth.currentUser;
  }
}
