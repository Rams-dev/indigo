import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormEventComponent } from '../../events/form-event/form-event.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { EventService } from '../../events/event.service';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-modal-event',
  standalone: true,
  imports: [MatDialogModule, MatDialogActions, FormEventComponent, 
    ReactiveFormsModule, FormsModule, MatFormField, MatLabel, MatHint, CommonModule, MatInputModule],
  templateUrl: './modal-event.component.html',
  styleUrl: './modal-event.component.css'
})
export class ModalEventComponent{

  readonly dialogRef = inject(MatDialogRef<ModalEventComponent>);
  data = inject<any>(MAT_DIALOG_DATA);
  mostrarInfo:boolean = false
  info:any 

  form:FormGroup

  close(){
    this.dialogRef.close();
  }

  constructor(
    private eventService:EventService
  ){
    

  }

  ngOnInit(): void {
    console.log(this.data);
    

    if(this.data.mostrarinfo){
      this.mostrarInfo = true
      this.info = this.data.data

    }

    
    
    this.form = new FormGroup({
      idEvent: new FormControl(''),
      title: new FormControl('', Validators.required),
      description : new FormControl('', Validators.required),
      dateStart : new FormControl(''),
      dateEnd : new FormControl(''),
    })
  
    this.form.markAllAsTouched(); 
    this.form.patchValue(this.data.data)
    this.form.patchValue({dateStart: this.data.data.dateStr})

    
  }

  
  save(){
    this.eventService.post(this.form.value).subscribe(data => {
      
      this.dialogRef.close("creado")
      
    })
    
  }


  actualizar(){
    this.eventService.put(this.form.value.idEvent, this.form.value).subscribe(data => {
      console.log(data);
      this.dialogRef.close("creado")

    })
  }

  

}
