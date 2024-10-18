import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import moment from 'moment';
import { HolidayService } from '../holiday.service';

@Component({
  selector: 'app-form-new-holiday',
  standalone: true,
  imports: [MatDatepickerModule,MatFormFieldModule,MatInputModule,ReactiveFormsModule, MatDialogModule, MatNativeDateModule,
     MatButtonModule, FormsModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './form-new-holiday.component.html',
  styleUrl: './form-new-holiday.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormNewHolidayComponent implements OnInit{

  form:FormGroup
  private holidayService = inject(HolidayService)

  constructor(
    private dialog: MatDialogRef<FormNewHolidayComponent>
  ) { }


  ngOnInit(): void {
    

    this.form = new FormGroup({
      date: new FormControl(),
      description: new FormControl('')
    })
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


  setDate(){
    this.form.value.date = moment(this.form.value.date).format('Y-M-D')
  }

  datePicketChanges($event:any){
    console.log($event);
    

  }



}
