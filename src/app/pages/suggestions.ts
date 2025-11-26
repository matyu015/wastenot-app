import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-suggestions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './suggestions.html',
  styleUrl: './suggestions.css'
})
export class SuggestionsComponent {
  recipes: { text: string; date: string }[] = [];
  searchTerm: string = '';

  ngOnInit() {
    this.loadRecipes();
  }

  loadRecipes() {
    const saved = JSON.parse(localStorage.getItem('recipes') || '[]');
    this.recipes = saved;
  }

get filteredRecipes() {
    const term = this.searchTerm.toLowerCase();
    if (!term) return this.recipes;
    return this.recipes.filter(r => r.text.toLowerCase().includes(term));
  }

  deleteRecipe(recipeToDelete: { text: string; date: string }) {
    this.recipes = this.recipes.filter(r => r !== recipeToDelete);
    localStorage.setItem('recipes', JSON.stringify(this.recipes));
  }

  clearRecipes() {
    localStorage.removeItem('recipes');
    this.recipes = [];
  }

   highlightText(text: string): string {
    if (!this.searchTerm.trim()) return text;
    const term = this.searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escape regex chars
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }
}
