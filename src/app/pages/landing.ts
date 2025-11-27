import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './landing.html',
  styleUrls: ['./landing.css']
})
export class LandingComponent {

  email = '';
  password = '';

  registerMode = false;
  regEmail = '';
  regPassword = '';
  regConfirm = '';

  loading = false;
  error = '';

  constructor(private auth: Auth, private router: Router) {}

  forgotPassword() {
  alert('Use password reset from the app.');
}


  async login() {
    this.error = '';
    this.loading = true;

    try {
      await signInWithEmailAndPassword(this.auth, this.email, this.password);
      this.router.navigate(['/']); // continue to main app
    } catch (err: any) {
      this.error = err.message;
    }

    this.loading = false;
  }

  async register() {
    this.error = '';

    if (this.regPassword !== this.regConfirm) {
      this.error = "Passwords do not match.";
      return;
    }

    this.loading = true;

    try {
      await createUserWithEmailAndPassword(this.auth, this.regEmail, this.regPassword);
      this.registerMode = false;
      alert("Account created. You may now log in.");
    } catch (err: any) {
      this.error = err.message;
    }

    this.loading = false;
  }
}
