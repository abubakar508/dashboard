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
  users: User[] = []; // Array to store users
  newUser: User = { name: '', email: '', password: '' }; // Object to store new user data
  selectedUser: User | null = null; // Variable to store the selected user for update
  isAddingUser = false; // Flag to show/hide add user form
  isUpdatingUser = false; // Flag to show/hide update user form

  constructor(public userAuthService: UserAuthService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') === "" || localStorage.getItem('token') === null) {
      this.router.navigateByUrl('/');
    } else {
      this.fetchUsers(); 
    }
  }

  fetchUsers(): void {
    this.userAuthService.getUser().then(({ data }) => {
      this.users = data; 
    });
  }

  addUser(): void {
    this.userAuthService.addUser(this.newUser).then(() => {
      this.fetchUsers(); 
      this.newUser = { name: '', email: '', password: '' }; 
      this.isAddingUser = false; 
    });
  }

  updateUser(user: User): void {
    this.selectedUser = { ...user }; 
    this.isUpdatingUser = true;
  }

  saveUpdatedUser(): void {
    if (this.selectedUser) {
      this.userAuthService.updateUser(this.selectedUser).then(() => {
        this.fetchUsers(); 
        this.selectedUser = null;
        this.isUpdatingUser = false;
      });
    }
  }

  cancelUpdate(): void {
    this.selectedUser = null;
    this.isUpdatingUser = false;
  }

  deleteUser(user: User): void {
    this.userAuthService.deleteUser(user.id).then(() => {
      this.fetchUsers();
    });
  }

  searchUser(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    // todo: include search logic using the value type
  }
}
