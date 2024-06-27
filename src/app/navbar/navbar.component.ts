import { Component } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { Router } from '@angular/router';
import { User } from '../user/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  user!: User;
  isSidebarOpen = false;

  isDropdownOpen: boolean = false;

  constructor(public userAuthService: UserAuthService, private router: Router) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  logoutAction() {
    this.userAuthService.logout().then(() => {
      localStorage.setItem('token', "");
      this.router.navigateByUrl('/');
    }).catch(() => {
      localStorage.setItem('token', "");
      this.router.navigateByUrl('/');
    });
  }

}
