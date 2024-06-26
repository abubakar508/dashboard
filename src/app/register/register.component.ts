import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  name:string = ''
  email:string = ''
  password:string = ''
  confirmPassword:string = ''
  isSubmitting:boolean = false
  validationErrors:any = []
 
  constructor(public userAuthService: UserAuthService, private router: Router) {}
 
  ngOnInit(): void {
    if(localStorage.getItem('token') != "" && localStorage.getItem('token') != null){
      this.router.navigateByUrl('/dashboard')
    }
  }
 
  registerAction() {
    this.isSubmitting = true;
    let payload = {
      name:this.name,
      email:this.email,
      password:this.password,
      confirmPassword:this.confirmPassword
    }
 
    this.userAuthService.register(payload)
    .then(({data}) => {
      localStorage.setItem('token', data.token)
      this.router.navigateByUrl('/dashboard')
      return data
    }).catch(error => {
      this.isSubmitting = false;
      if (error.response.data.errors != undefined) {
        this.validationErrors = error.response.data.errors
      }
      
      return error
    })
  }
}