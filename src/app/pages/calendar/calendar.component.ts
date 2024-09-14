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
import { map } from 'rxjs';
import moment from 'moment';

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
  eventsCalendar:any=[]
  events:any=[]

  constructor(
    private eventService:EventService
  ){
    this.calendarOptions = {
      locale: esLocale,
      // initialView: 'dayGridMonth',
      initialView: 'timeGridDay',
      
      dropAccept: ".item-class",
      // allDaySlot: false,
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, bootstrapPlugin],
      themeSystem: 'bootstrap5',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
        // right: 'dayGridMonth,timeGridWeek,timeGridDay'
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
      eventReceive:(info) => this.eventReceive(info),
      eventClick:(info) => this.eventClick(info),
      dateClick:(info) => this.dateClick(info),
      eventDrop:(info) => this.eventDrop(info),
      eventResize:(info) => this.eventResize(info),

    }
  }

  ngOnInit(): void {

    this.getEvents()
    this.crearHorario()

    
    
  }


  crearHorario(){
    console.log(this.eventsCalendar);
    
    // this.calendarOptions.events = this.eventsCalendar
    // this.calendarOptions.

  }

  ngAfterViewInit(): void {   
    
    new Draggable(document.getElementById('mydraggable')!,  {
      itemSelector: '.item-class'
    });

  }





  getEvents(){
    this.eventService.getAll().pipe(
      map((resp:any) => {

        return resp.data.map((res:any) => {

          let allDay = moment(res.dateStart).format("HH:MM:SS").startsWith("00:")
          
          
          return {
            "idEvent":res.idEvent,
            "title":res.title,
            "start":res.dateStart,
            "end":res.dateEnd,
            "allDay": allDay,
            "extendedProps": res
          }

        })
      })
    ).
    subscribe(data => {
      
      console.log(data);
      this.eventsCalendar = data
      this.calendarOptions.events = data
      this.events = data.filter((e:any) => e.start == null)
      console.log(this.events);
      
      
    })
  }

  eventClick(event:any){

    this.openModal(event.event.extendedProps, true)
    
    // this.update(event.event.extendedProps)
    

  }

  update(event:any){
    // console.log(event.event.start);
    // console.log(event.event.end);
    
    // let data = event.event.extendedProps
    // // data.dateStart = moment(event.event.start).format("YYYY-MM-DD")
    // console.log(data)
    this.eventService.put(event.idEvent, event).subscribe(data => {

    })
  }


  eventReceive(event:any){
    let data = {...event.event.extendedProps}
    
    if(event.event.end){
      data.dateEnd = this.parseFecha(event.event.end)
    }
    data.dateStart =this.parseFecha(event.event.start)
    console.log(data);

    this.update(data)
    
    

  }

  parseFecha(date:any){
    return moment(date).format()

  }


  eventResize(event:any){

    
    let data = {...event.event.extendedProps}
    console.log(this.parseFecha(event.event.end));
    
    data.dateEnd = this.parseFecha(event.event.end)
    data.dateStart =this.parseFecha(event.event.start)
    
    this.update(data)

  }

  eventDrop(event:any){

    let data = {...event.event.extendedProps}
    console.log(this.parseFecha(event.event.end));
    
    data.dateEnd = this.parseFecha(event.event.end)
    data.dateStart =this.parseFecha(event.event.start)
    
    this.update(data)
    
  }

  dateClick(event:any){
    console.log(event);
    this.openModal(event)
    
    

  }

  openModal(data:any, mostrarinfo = false){
    const dialogRef = this.dialog.open(ModalEventComponent, {height:'auto', width:'50%', data:{data, mostrarinfo}, })
    .afterClosed().subscribe(data => {
      if(data == 'creado'){
        this.getEvents()
      }
    });
  }

}
