import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit {
   constructor(private auth: AuthService) {}
  title = 'portfolio-admin';
  isLogin=false;
  isSidebarOpen = false;
    ngOnInit() {
    this.auth.isLoggedIn$.subscribe(status => {
      this.isLogin = status;
    });
  }
  toggleSidebar() {
  this.isSidebarOpen = !this.isSidebarOpen;
}

closeSidebar() {
  this.isSidebarOpen = false;
}
}
