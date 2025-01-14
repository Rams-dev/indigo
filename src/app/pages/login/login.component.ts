import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldControl, MatFormFieldModule, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../components/auth.service';
import { AlertService } from '../../components/alert/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatLabel, MatHint, CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  form:FormGroup

  private alertService = inject(AlertService)

  constructor(
    private authService: AuthService
  ){

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      noTelefono : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required),
    })
  
    this.form.markAllAsTouched();  
    
  }

  login(){
    this.authService.auth(this.form.value).subscribe(
      { 
        next: data => {
      console.log(data);
      let user = data.usuarioData
      user.token = data.token
      this.authService.setCurrenUser(user)
      this.authService.currentUser$.next(user)
      this.authService.currentUser = user
      
    },
      error: (error) =>{
        console.log(error);
        if(error.status == 400){
          this.alertService.openSnackBar(error.error.message)

          
          
        }
          
          
        
      }})
    console.log(this.form.value);
    
  }


}
