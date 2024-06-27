import { Injectable } from '@angular/core';
import axios from 'axios'; // Ensure Axios is installed and imported
import { User } from './user/user';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  updateUser(updatedUser: User): Promise<any>{
    return axios.put(`/api/user/${updatedUser.id}`, updatedUser, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } });
  }
  deleteUser(id: number | undefined): Promise<any> {
    if (id === undefined) {
      throw new Error('User ID is undefined.');
    }

    return axios.delete(`/api/users/${id}`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } });
  }

  addUser(newUser: User): Promise<any> {
    // Assuming newUser is an object of type User with name, email, and password properties
    let payload = {
      name: newUser.name,
      email: newUser.email,
      password: newUser.password
    };

    return axios.post('/api/users', payload);
  }

  constructor() { }

  login(data: { email: string, password: string }): Promise<any> {
    let payload = {
      email: data.email,
      password: data.password
    };

    return axios.post('/api/login', payload);
  }

  register(data: { name: string, email: string, password: string, confirmPassword: string }): Promise<any> {
    let payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.confirmPassword
    };

    return axios.post('/api/register', payload);
  }

  getUser(): Promise<any> {
    return axios.get('/api/user', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } });
  }

  logout(): Promise<any> {
    return axios.post('/api/logout', {}, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } });
  }
}
