import { Routes } from '@angular/router';
import { Home } from './pages/home';
import { authGuard } from './guards/auth.guard';
import { LandingComponent } from './pages/landing';

export const routes: Routes = [
  { path: 'auth', component: LandingComponent },
  { path: 'login', component: LandingComponent },

  { path: '', component: Home, canActivate: [authGuard] },

  { 
    path: 'generate',
    loadComponent: () => import('./pages/generate').then(m => m.GenerateComponent),
    canActivate: [authGuard]
  },

  { 
    path: 'suggestions',
    loadComponent: () => import('./pages/suggestions').then(m => m.SuggestionsComponent),
    canActivate: [authGuard]
  },

  { path: '**', redirectTo: 'login' }
];
