import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// -------------------------
// Firebase Auth
// -------------------------
import {
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification
} from '@angular/fire/auth';

// -------------------------
// Firestore (FIXED IMPORTS)
// -------------------------
import { Firestore } from '@angular/fire/firestore';
import {
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  // ---------------------
  // REGISTER FORM FIELDS
  // ---------------------
  fullName = '';
  registerEmail = '';
  password = '';
  confirmPassword = '';

  // UI STATUS
  emailStatus: 'checking' | 'available' | 'taken' | null = null;
  passwordMismatch = false;

  constructor(private auth: Auth, private firestore: Firestore) {}

  // ================================
  // 🔍 EMAIL AVAILABILITY CHECK
  // ================================
  async verifyEmail() {
    if (!this.registerEmail) return;

    this.emailStatus = 'checking';

    const email = this.registerEmail.trim().toLowerCase();
    const userDocRef = doc(this.firestore, 'users', email);
    const existingUser = await getDoc(userDocRef);

    this.emailStatus = existingUser.exists() ? 'taken' : 'available';
  }

  // ================================
  // 🔐 REGISTER USER
  // ================================
  async registerUser() {
    // Check password match
    this.passwordMismatch = this.password !== this.confirmPassword;
    if (this.passwordMismatch) return;

    if (this.emailStatus !== 'available') {
      console.log('Email not available');
      return;
    }

    try {
      // Step 1: Create Firebase Auth account
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        this.registerEmail,
        this.password
      );

      // Step 2: Save user profile in Firestore
      await setDoc(
        doc(this.firestore, 'users', this.registerEmail.toLowerCase()),
        {
          fullName: this.fullName,
          email: this.registerEmail,
          createdAt: new Date()
        }
      );

      // Step 3: Send email verification
      await sendEmailVerification(userCredential.user);

      alert('Account created! Please verify your email.');

      // Clear form
      this.fullName = '';
      this.registerEmail = '';
      this.password = '';
      this.confirmPassword = '';
      this.emailStatus = null;

    } catch (err: any) {
      console.error('Registration Error:', err);
      alert(err.message || 'Registration failed');
    }
  }
}
