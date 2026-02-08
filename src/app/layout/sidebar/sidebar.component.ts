import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
 @Input() isOpen = false;
  @Output() closeSidebar = new EventEmitter<void>();

  constructor(private router: Router) {}

  navigate(route: string) {
    this.router.navigate([route]);
    this.closeSidebar.emit(); // 🔥 close after selection
  }
}
