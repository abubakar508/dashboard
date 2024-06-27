import { Component } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  sidebarOpen = false; 

  constructor(public userAuthService: UserAuthService, private router: Router) {}

  navigate(path: string) {
    this.router.navigate([path]);
    this.sidebarOpen = false; 
  }
}
