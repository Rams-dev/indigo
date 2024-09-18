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
import {DragDropModule} from '@angular/cdk/drag-drop';
import moment from 'moment';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule, CommonModule, DragDropModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit, AfterViewInit{

  calendarOptions: CalendarOptions 
  readonly dialog = inject(MatDialog);
  eventsCalendar:any=[]
  events:any=[]
  eventsWithOutDate:any = []

  dateStart:any
  dateEnd:any

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
      nowIndicator:true,
      droppable: true,
      contentHeight:"70vh",
      editable: true,
      dragRevertDuration: 5,
      drop:(info:any) => {
        console.log(info);
        
        return
      },
      eventReceive:(info) => this.eventReceive(info),
      eventClick:(info) => this.eventClick(info),
      dateClick:(info) => this.dateClick(info),
      eventDrop:(info) => this.eventDrop(info),
      eventMouseEnter(arg) {
        console.log(arg);
        
      },
      eventResize:(info) => this.eventResize(info),
      viewDidMount:(info) => {

        
        
      },
      datesSet: (info) => {
        this.dateStart = moment(info.view.currentStart).format('yyyy-MM-DD HH:mm:ss')
        this.dateEnd = moment(info.view.currentEnd).format('yyyy-MM-DD HH:mm:ss')
        this.getEvents()
        this.crearHorario()
        
      }

    }
  }

  ngOnInit(): void {

    this.getEvents()
    this.getEventsWithOutDate()
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


  getEventsWithOutDate(){
    this.eventService.getByParams({"date":"no"}).subscribe(res => {
      console.log(res);
      
      this.eventsWithOutDate = this.formatEvents(res.data)
    })

  }



  getEvents(){
    let obj = {
      "dateStart": this.dateStart,
      "dateEnd": this.dateEnd
    }
    this.eventService.getByParams(obj).
    subscribe(data => {
      console.log(data);
      // this.eventsCalendar = this.formatEvents(data)
      this.calendarOptions.events = this.formatEvents(data.data)
      
    })
  }

  eventClick(event:any){

    this.openModal(event.event.extendedProps, true)
    
    // this.update(event.event.extendedProps)
    

  }

  formatEvents(data:any){
    return data.map((res:any) => {

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

  }

  update(event:any){
    // console.log(event.event.start);
    // console.log(event.event.end);
    
    // let data = event.event.extendedProps
    // data.dateStart = moment(event.event.start).format("YYYY-MM-DD")
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
    event.draggedEl.parentNode.removeChild(event.draggedEl);
    
    

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
        this.getEventsWithOutDate()
      }
    });
  }

}
