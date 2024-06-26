import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { Router } from '@angular/router';
import { User } from '../user/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user!: User;
  sidebarOpen = false; 
  isDropdownOpen: boolean = false;

  constructor(public userAuthService: UserAuthService, private router: Router) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  ngOnInit(): void {
    // Check if token is available
    if (localStorage.getItem('token') === "" || localStorage.getItem('token') === null) {
      this.router.navigateByUrl('/');
    } else {
      this.userAuthService.getUser().then(({ data }) => {
        this.user = data;
      });
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  navigate(path: string) {
    this.router.navigate([path]);
    this.sidebarOpen = false; // Close the sidebar after navigation
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
