import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

export const authGuard = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  return auth.onAuthStateChanged(user => {
    if (user) {
      return true;
    } else {
      router.navigate(['/auth']);
      return false;
    }
  });
};
