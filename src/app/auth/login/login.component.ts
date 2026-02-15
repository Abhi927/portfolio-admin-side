import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
 email = '';
 password = '';
  constructor(
    private auth: AuthService, private route:Router) {}
  ngOnInit(): void {
    if (this.auth.hasToken()) {
      this.auth.Autologin();
      this.route.navigate(['/dashboard']);
    }
  }
  login() {
      this.auth.login({ email: this.email, password: this.password }).subscribe({
        next: (response) => {
          console.log('Login successful');
          console.log(response);
          this.route.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Login failed', err);
          alert('Login failed: ' + (err.error?.message || 'Unknown error'));
        }
      });
  }
}
