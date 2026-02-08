import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private auth: AuthService) {}
userEmail = 'admin@example.com';
@Output() toggle = new EventEmitter<void>();
  logout() {
    this.auth.logout();
    console.log('Logout clicked');
}
}
