import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatFormFieldModule, MatHint, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment'
import { UserService } from '../user.service';
import { AlertService } from '../../../components/alert/alert.service';


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
  idUser:String | null = null
  user:any = []

  constructor(
    private route:ActivatedRoute,
    private userService:UserService,
    public snack:AlertService,
  ) { }

  ngOnInit(): void {
    this.idUser = this.route.snapshot.paramMap.get('idUser');

    if (this.idUser){
      this.getUser()
    }

    this.form = new FormGroup({
      idUsuario: new FormControl(''),
      nombre: new FormControl('', Validators.required),
      apellidoPaterno : new FormControl('', Validators.required),
      apellidoMaterno : new FormControl('', Validators.required),
      noTelefono : new FormControl('', Validators.required),
      fechaNacimiento : new FormControl('', Validators.required),
      fechaDeIngresoLaboral : new FormControl('', Validators.required),
      idRol : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required),
    })

    this.form.markAllAsTouched();    

    // this.form.patchValue(this.data)

  }

  getUser(){
    this.userService.getOne(Number(this.idUser)).subscribe(data => {
      console.log(data.data);
      
      this.user = data.data
      this.form.patchValue(data.data)

    })
  }


  guardar(){
    this.formatfechas()
    this.snack.openSnackBar("Usuario agregado")
    console.log(this.form.value);
    

  }

  formatfechas(){
    
    this.form.value.fechaIngresoLaboral = moment(this.form.value.fechaIngresoLaboral).format('YYYY-MM-DD')
    this.form.value.fechaNacimiento = moment(this.form.value.fechaNacimiento).format('YYYY-MM-DD')
  }

  actualizar(){
    this.formatfechas()
    console.log(this.form.value);
    this.userService.put(this.form.value.idUsuario,this.form.value).subscribe(data => {
      this.getUser()
      this.snack.openSnackBar("Usuario Actualizado")
    })
    
    
  }
}
