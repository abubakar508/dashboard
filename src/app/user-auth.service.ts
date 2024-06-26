import { Injectable } from '@angular/core';
import axios from 'axios';
 
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
 
  constructor() { }
 
  login(data:any): Promise<any>{
    let payload = {
      email: data.email,
      password: data.password
    }
  
    return axios.post('/api/login', payload)
  }
 
  register(data:any): Promise<any>{
    let payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.confirmPassword
    }
     
    return axios.post('/api/register', payload)
  }
 
  getUser(): Promise<any>{
 
    return axios.get('/api/user', { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
  }
 
  logout(): Promise<any>{
 
    return axios.post('/api/logout',{}, { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
  }
}