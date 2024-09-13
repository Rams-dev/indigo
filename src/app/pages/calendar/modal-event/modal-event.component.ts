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

  form:FormGroup

  close(){
    this.dialogRef.close();
  }

  constructor(
    private eventService:EventService
  ){
    

  }

  ngOnInit(): void {
    
    this.form = new FormGroup({
      idEvent: new FormControl(''),
      title: new FormControl('', Validators.required),
      description : new FormControl('', Validators.required),
      dateStart : new FormControl(''),
      dateEnd : new FormControl(''),
    })
  
    this.form.markAllAsTouched(); 
    this.form.patchValue(this.data)
    this.form.patchValue({dateStart: this.data.dateStr})

    
  }

  
  save(){
    this.eventService.post(this.form.value).subscribe(data => {
      
      this.dialogRef.close("creado")
      
    })
    
  }

  

}
