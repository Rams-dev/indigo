import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import moment from 'moment';
import { HolidayService } from '../holiday.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-new-holiday',
  standalone: true,
  imports: [MatDatepickerModule,MatFormFieldModule,MatInputModule,ReactiveFormsModule, MatDialogModule, MatNativeDateModule,
     MatButtonModule, FormsModule, CommonModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './form-new-holiday.component.html',
  styleUrl: './form-new-holiday.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormNewHolidayComponent implements OnInit{

  form:FormGroup
  private holidayService = inject(HolidayService)

  constructor(
    private dialog: MatDialogRef<FormNewHolidayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {data: any}
  ) { }


  ngOnInit(): void {

    console.log(this.data);
    

    this.form = new FormGroup({
      idHoliday: new FormControl(),
      date: new FormControl(),
      description: new FormControl('')
    })

    this.form.patchValue(this.data)
  }


  save(){

    this.setDate()
    console.log(this.form.value);
    console.log("this.form.value");
    
    this.holidayService.post(this.form.value).subscribe(data => {
      if(data){
        this.dialog.close('creado')
      }
    })
    
    
  }


  update(){
    this.setDate()
    
    this.holidayService.put(this.form.value.idHoliday ,this.form.value).subscribe(data => {
      if(data){
        this.dialog.close('creado')
      }
    })
  }


  setDate(){
    this.form.value.date = moment(this.form.value.date).format('Y-M-D')
  }

  datePicketChanges($event:any){
    console.log($event);
    

  }



}
