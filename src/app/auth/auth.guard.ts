import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.authService.hasToken()) {
      this.router.navigate(['/login']);
      return false;
    }
     if (this.authService.isTokenExpired()) {
    this.authService.logout();
    this.router.navigate(['/login']);
    return false;
   }
    return true;
  }
}
