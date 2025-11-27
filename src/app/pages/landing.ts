import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Firebase Auth
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification
} from '@angular/fire/auth';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class LandingComponent {

  // -----------------------
  // LOGIN FIELDS
  // -----------------------
  email = '';
  password = '';

  // -----------------------
  // REGISTER MODE & FIELDS
  // -----------------------
  registerMode = false;
  regEmail = '';
  regPassword = '';
  regConfirm = '';

  // -----------------------
  // STATUS
  // -----------------------
  loading = false;
  error: string | null = null;

  constructor(private auth: Auth, private router: Router) {}

  // ======================
  // 🔐 LOGIN USER
  // ======================
  async login() {
    this.error = null;
    this.loading = true;

    try {
      await signInWithEmailAndPassword(this.auth, this.email, this.password);
      this.router.navigate(['/home']); // redirect to home screen
    } catch (err: any) {
      this.error = err.message || 'Login failed.';
    }

    this.loading = false;
  }

  // ======================
  // 🔐 REGISTER USER
  // ======================
  async register() {
    this.error = null;

    if (this.regPassword !== this.regConfirm) {
      this.error = "Passwords do not match.";
      return;
    }

    this.loading = true;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        this.regEmail,
        this.regPassword
      );

      // Send verification email
      await sendEmailVerification(userCredential.user);

      alert("Account created! Please check your email to verify your account.");

      // Switch back to login
      this.registerMode = false;
      this.regEmail = '';
      this.regPassword = '';
      this.regConfirm = '';

    } catch (err: any) {
      this.error = err.message || 'Registration failed.';
    }

    this.loading = false;
  }

  // ======================
  // 🔐 FORGOT PASSWORD
  // ======================
  forgotPassword() {
    alert("Password reset will be added soon.");
  }
}
