import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatFormFieldModule, MatHint, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import moment from 'moment'


@Component({
  selector: 'app-new-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule, 
    MatInputModule, MatLabel, 
    MatHint, FormsModule, 
    ReactiveFormsModule, CommonModule,
    MatDatepickerModule, MatIconModule, MatSelect, MatOption
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent implements OnInit{


  form: FormGroup;

  constructor(
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      idUsuario: new FormControl(''),
      nombre: new FormControl('', Validators.required),
      apellidoPaterno : new FormControl('', Validators.required),
      apellidoMaterno : new FormControl('', Validators.required),
      telefono : new FormControl('', Validators.required),
      fechaNacimiento : new FormControl('', Validators.required),
      fechaIngresoLaboral : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required),
    })

    this.form.markAllAsTouched();    

    // this.form.patchValue(this.data)

  }


  guardar(){
    this.formatfechas()
    console.log(this.form.value);
    

  }

  formatfechas(){
    
    this.form.value.fechaIngresoLaboral = moment(this.form.value.fechaIngresoLaboral).format('YYYY-MM-DD')
    this.form.value.fechaNacimiento = moment(this.form.value.fechaNacimiento).format('YYYY-MM-DD')
  }

  actualizar(){
    this.formatfechas()
    
  }
}
