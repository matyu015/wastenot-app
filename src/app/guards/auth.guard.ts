import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

export const authGuard = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  return new Promise<boolean>((resolve) => {
    const unsub = auth.onAuthStateChanged(user => {
      unsub();
      if (user) resolve(true);
      else {
        router.navigate(['/login']);
        resolve(false);
      }
    });
  });
};
