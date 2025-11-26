import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  registerEmail: string = '';
  emailStatus: 'checking' | 'available' | 'taken' | null = null;

  verifyEmail() {
    this.emailStatus = 'checking';

    const usedEmails = [
      'test@example.com',
      'admin@gmail.com',
      'user@yahoo.com'
    ];

    setTimeout(() => {
      if (usedEmails.includes(this.registerEmail.trim().toLowerCase())) {
        this.emailStatus = 'taken';
      } else {
        this.emailStatus = 'available';
      }
    }, 600);
  }

  // ✅ ADD THIS METHOD (this removes the red underline)
  registerUser() {
    console.log('Register form submitted');

    // Example validation
    if (this.emailStatus !== 'available') {
      console.log('Cannot create account — email not valid');
      return;
    }

    // You can add your full registration logic here
    console.log('Account successfully created!');
  }
}
