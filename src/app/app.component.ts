import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SkillService } from './modules/skills/skill.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit {
   constructor(private auth: AuthService,private route:Router,private skilservice:SkillService) {}
  title = 'portfolio-admin';
  isLogin=false;
  isSidebarOpen = false;
    ngOnInit() {
    this.auth.isLoggedIn$.subscribe(status => {
      this.isLogin = status;
      if(!status){
        this.route.navigate(['/login']);
      }
      else{
        this.skilservice.loadSkill().subscribe();
      }
    });
  }
  toggleSidebar() {
  this.isSidebarOpen = !this.isSidebarOpen;
}

closeSidebar() {
  this.isSidebarOpen = false;
}
}
