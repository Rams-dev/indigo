import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
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
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { ModalEventComponent } from './modal-event/modal-event.component';
import bootstrapPlugin from '@fullcalendar/bootstrap5';
import { EventService } from '../events/event.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule, CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit, AfterViewInit{

  calendarOptions: CalendarOptions 
  readonly dialog = inject(MatDialog);
  events:any=[]

  constructor(
    private eventService:EventService
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

    this.getEvents()
    
  }

  ngAfterViewInit(): void {   
    
    new Draggable(document.getElementById('mydraggable')!,  {
      itemSelector: '.item-class'
    });

  }


  getEvents(){
    this.eventService.getAll().subscribe(data => {
      this.events = data.data.filter((e:any) => e.dateStart == null)
      console.log(data.data);
      console.log(this.events);
      
      
    })
  }

  eventClick(event:any){
    console.log(event);
    

  }

  dateClick(event:any){
    console.log(event);
    const dialogRef = this.dialog.open(ModalEventComponent, {height:'auto', width:'50%', data:event});
    

  }

}
