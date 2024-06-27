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
      this.fetchUsers(); // Load users initially
    }
  }

  fetchUsers(): void {
    this.userAuthService.getUser().then(({ data }) => {
      this.users = data; // Assuming getUsers() returns a list of users
    });
  }

  addUser(): void {
    this.userAuthService.addUser(this.newUser).then(() => {
      this.fetchUsers(); // Refresh the list after adding user
      this.newUser = { name: '', email: '', password: '' }; // Clear new user data
      this.isAddingUser = false; // Hide add user form after submission
    });
  }

  updateUser(user: User): void {
    this.selectedUser = { ...user }; // Set selectedUser for update
    this.isUpdatingUser = true; // Show update user form
  }

  saveUpdatedUser(): void {
    if (this.selectedUser) {
      this.userAuthService.updateUser(this.selectedUser).then(() => {
        this.fetchUsers(); // Refresh the list after updating user
        this.selectedUser = null; // Clear selectedUser after update
        this.isUpdatingUser = false; // Hide update user form after submission
      });
    }
  }

  cancelUpdate(): void {
    this.selectedUser = null; // Clear selectedUser on cancel
    this.isUpdatingUser = false; // Hide update user form on cancel
  }

  deleteUser(user: User): void {
    this.userAuthService.deleteUser(user.id).then(() => {
      this.fetchUsers(); // Refresh the list after deleting user
    });
  }

  // Implement search functionality and user selection for update
  searchUser(event: Event) {
    const target = event.target as HTMLInputElement; // Cast event.target to HTMLInputElement
    const value = target.value; // Now TypeScript recognizes value property
    // Your search logic using 'value'
  }
}
