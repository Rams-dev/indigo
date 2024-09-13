import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EventService } from '../event.service';

@Component({
  selector: 'app-form-event',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatFormField, MatLabel,
    MatHint, CommonModule, MatInputModule
  ],
  templateUrl: './form-event.component.html',
  styleUrl: './form-event.component.css'
})
export class FormEventComponent {



}
