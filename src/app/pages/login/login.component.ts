import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldControl, MatFormFieldModule, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatLabel, MatHint, CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  form:FormGroup

  constructor(){

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      noTelefono : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required),
    })
  
    this.form.markAllAsTouched();  
    
  }

  login(){
    console.log(this.form.value);
    
  }


}
