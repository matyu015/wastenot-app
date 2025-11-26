import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AiService } from '../services/ai';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [AiService],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css']
})
export class ChatComponent {

  userMessage: string = '';
  messages: Array<{ from: 'user' | 'bot', text: string }> = [];
  loading = false;

  constructor(private aiService: AiService) {}

  sendMessage() {
    if (!this.userMessage.trim()) return;

    const message = this.userMessage.trim();
    this.messages.push({ from: 'user', text: message });
    this.userMessage = '';
    this.loading = true;

    const ingredients = message.split(',').map(i => i.trim());

    this.aiService.generateRecipes(ingredients).subscribe({
      next: (res) => {
        this.messages.push({ from: 'bot', text: res.text });
        this.loading = false;
      },
      error: () => {
        this.messages.push({ from: 'bot', text: '❌ Something went wrong!' });
        this.loading = false;
      }
    });
  }
}
