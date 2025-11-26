import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AiService } from '../services/ai';

@Component({
  selector: 'app-generate',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './generate.html',
  styleUrl: './generate.css'
})
export class GenerateComponent {
  // --- Manual Input Mode ---
  ingredients: string = '';
  result: string = '';
  loading = false;

  // --- Chat Mode ---
  tab: 'chat' | 'manual' = 'manual';
  chatMessage: string = '';
  chatResponse: string = '';
  loadingChat = false;

  constructor(private aiService: AiService) {}

  // --- Manual Input Recipe Generation ---
  generate() {
    const list = this.ingredients.split(',').map(i => i.trim());
    this.loading = true;

    this.aiService.generateRecipes(list).subscribe({
      next: (res) => {
        this.result = res.text;
        this.loading = false;

        // 🕒 Save generated recipe with timestamp (for Recipe Suggestions tab)
        const saved = JSON.parse(localStorage.getItem('recipes') || '[]');
        saved.push({
          text: this.result,
          date: new Date().toLocaleString()
        });
        localStorage.setItem('recipes', JSON.stringify(saved));
      },
      error: () => {
        this.result = 'Something went wrong!';
        this.loading = false;
      }
    });
  }

  // --- Chat with Chef AI ---
  sendChatMessage() {
    if (!this.chatMessage.trim()) return;
    this.loadingChat = true;

    this.aiService.sendChefMessage(this.chatMessage).subscribe({
      next: (res) => {
        this.chatResponse = res.text || 'No response from Chef AI.';
        this.loadingChat = false;

        // 🕒 Save Chef AI response to the same "recipes" list
        const saved = JSON.parse(localStorage.getItem('recipes') || '[]');
        saved.push({
          text: `Chef AI (${this.chatMessage}):\n${this.chatResponse}`,
          date: new Date().toLocaleString()
        });
        localStorage.setItem('recipes', JSON.stringify(saved));

        // Clear input after sending
        this.chatMessage = '';
      },
      error: () => {
        this.chatResponse = 'Chef AI Response: Something went wrong while talking to Chef AI.';
        this.loadingChat = false;
      }
    });
  }

  // --- Quick message shortcuts ---
  setQuickMessage(msg: string) {
    this.chatMessage = msg;
    this.sendChatMessage();
  }
}
