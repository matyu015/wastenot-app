import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  // Sample recipe list (can be replaced with Firestore later)
  recommendedRecipes = [
  {
    title: "Chicken Adobo",
    description: "Classic Filipino dish with soy, vinegar, and garlic.",
    image: "assets/images/adobo.jpg"
  },
  {
    title: "Sinigang",
    description: "Tamarind soup with vegetables.",
    image: "assets/images/sinigang.jpg"
  }
];
  constructor() {}

}
