import { Routes } from '@angular/router';
import { Home } from './pages/home';
import { GenerateComponent } from './pages/generate';
import { SuggestionsComponent } from './pages/suggestions';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'generate', component: GenerateComponent},
  { path: 'suggestions', component: SuggestionsComponent },
];
