import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  // Backend base URL
  private apiBase = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  /**
   * 🍽️ Generate recipe manually using a list of ingredients
   * This hits the /api/generate endpoint
   */
  generateRecipes(ingredients: string[]): Observable<any> {
    return this.http.post(`${this.apiBase}/generate`, { ingredients });
  }

  /**
   * 👨‍🍳 Chat directly with Chef AI
   * This hits the /api/chat endpoint
   */
  sendChefMessage(message: string): Observable<any> {
    return this.http.post(`${this.apiBase}/chat`, { message });
  }
}
