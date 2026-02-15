import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from './auth-response.model';
import { tap } from 'rxjs/operators';
import {jwtDecode} from 'jwt-decode';
import { environment } from '../../environments/environment';
import { SkillService } from '../modules/skills/skill.service';
interface JwtPayload {
  exp: number;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
private API = environment.api.auth ;
  constructor(private http: HttpClient,private skillservice:SkillService) { }
  private loginStatus = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loginStatus.asObservable();

  login(data: { email: string; password: string } ) {
      return this.http.post<AuthResponse>(this.API, data).pipe(
        tap(response => {
          this.saveLogin(response);
        })
      );
  }
 saveLogin(response: AuthResponse) {
    localStorage.setItem('jwt', response.token);
    this.loginStatus.next(true);
    this.skillservice.loadSkill().subscribe();
  }
  logout() {
      localStorage.removeItem('jwt');
     this.loginStatus.next(false);
  }
    hasToken(): boolean {
    return !!localStorage.getItem('jwt');
  }
   getToken() {
    return localStorage.getItem('jwt');
  }
  Autologin() {
    if (this.hasToken()) {
      this.loginStatus.next(true);
      
    }
  }
    isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp < now;
    } catch {
      return true;
    }
  }
}


