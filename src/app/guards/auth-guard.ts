import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  // ❌ Token missing
  if (!token) {
    router.navigate(['/']);
    return false;
  }

  // ❌ Token expired
  if (isTokenExpired(token)) {
    localStorage.removeItem('token');
    router.navigate(['/']);
    return false;
  }

  // ✅ Token valid
  return true;
};

// 🔐 JWT Expiry Check
function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000; // convert to ms
    return Date.now() > expiry;
  } catch {
    return true; // invalid token format
  }
}
