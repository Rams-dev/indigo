import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form-event',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatFormField, MatLabel,
    MatHint, CommonModule, MatInputModule
  ],
  templateUrl: './form-event.component.html',
  styleUrl: './form-event.component.css'
})
export class FormEventComponent implements OnInit{

  form:FormGroup

  constructor(){

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      idTask: new FormControl(''),
      title: new FormControl('', Validators.required),
      startDate : new FormControl(null),
      endDate : new FormControl(null)
    })
  
    this.form.markAllAsTouched(); 
  }

  
  save(){
    console.log(this.form.value);
    
  }
}
