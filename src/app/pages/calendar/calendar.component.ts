import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ModalEventComponent } from './modal-event/modal-event.component';
import bootstrapPlugin from '@fullcalendar/bootstrap5';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule, CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit{

  calendarOptions: CalendarOptions 
  readonly dialog = inject(MatDialog

  );

  constructor(

  ){
    this.calendarOptions = {
      locale: esLocale,
      initialView: 'dayGridMonth',
      dropAccept: ".item-class",
      // allDaySlot: false,
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, bootstrapPlugin],
      themeSystem: 'bootstrap5',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      // scrollTime: this.horaActual,
      nowIndicator:true,
      droppable: true,
      contentHeight:"70vh",
      editable: true,
      events: [
        { title: 'event 1', date: '2024-09-01' },
        { title: 'event 2', date: '2024-09-11' }
      ],
      // eventDurationEditable: false,
      dragRevertDuration: 5,
      drop:(info:any) => {
        console.log(info);
        
        return
      },
      // eventReceive:(info) => this.eventReceive(info),
      eventClick:(info) => this.eventClick(info),
      dateClick:(info) => this.dateClick(info),
      eventDrop:(info) => {
        console.log(info);
        
      },
      eventResize:(info) => {
        console.log(info);
        
      },

    }
  }

  ngOnInit(): void {
    
  }

  eventClick(event:any){
    console.log(event);
    

  }

  dateClick(event:any){
    console.log(event);
    const dialogRef = this.dialog.open(ModalEventComponent, {height:'auto', width:'50%', data:event});
    

  }

}
