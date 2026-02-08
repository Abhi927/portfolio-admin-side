import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 email = '';
 password = '';
  constructor(
    private auth: AuthService,) {}
  login() {
      this.auth.login();
    console.log(this.email, this.password);
  }
}
