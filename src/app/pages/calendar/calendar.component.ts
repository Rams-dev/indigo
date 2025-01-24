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
import { HolidayService } from '../holidays/holiday.service';

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
  holidays:any = []
  dateStart:any
  dateEnd:any

  constructor(
    private eventService:EventService,
    private holidayService:HolidayService
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
        this.init()
        
      }

    }
  }


  init(){
    this.getEvents()
    this.getHolidays()
    this.crearHorario()
    this.getEventsWithOutDate()

  }

  ngOnInit(): void {
    this.dateStart = moment(new Date()).format('YYYY-MM-01')
    this.dateEnd = moment(new Date()).add(1, 'M').format('YYYY-MM-01')
    // this.init()
  }


  crearHorario(){
    this.calendarOptions.events = this.events
    
    // this.calendarOptions.events = this.eventsCalendar
    // this.calendarOptions.

  }

  ngAfterViewInit(): void {   
    
    new Draggable(document.getElementById('mydraggable')!,  {
      itemSelector: '.item-class'
    });

  }


  getHolidays(){
    let obj = {"dateStart": moment(this.dateStart).format("YYYY-MM-DD"),
      "dateEnd": moment(this.dateEnd).format("YYYY-MM-DD")
    }
    this.holidayService.getByParams(obj).
    pipe(map(response => {
      return response.data.map((res:any) => {
        this.holidays.push(res.date)
        
        return {
          // "idEvent":res.idHoliday,
          "title":res.description,
          "start":res.date,
          "allDay": true,
          "extendedProps": {...res, selectable:false},
          "display":'background'
        }
      })
    })).
    subscribe(res => {
      console.log(res);
      
      this.events = [...this.events, ...res]
      this.calendarOptions.events = this.events
    })
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
      this.events = this.formatEvents(data.data)
      console.log(data.data);  
      
      this.calendarOptions.events = this.events
      
    })
  }

  eventClick(event:any){
    this.openModal(event.event.extendedProps, true)  
  }

  formatEvents(data:any){

    return data.map((res:any) => {
      let hour = moment(res.dateStart).format("HH:MM:SS")
      console.log(hour);
      let allDay = moment(res.dateStart).format("HH:MM:SS").startsWith("00:")

      return {
        "idEvent":res.idEvent,
        "title":res.title,
        "start":res.dateStart,
        "end":res.dateEnd,
        "allDay": allDay,
        "extendedProps": res,
        "selectable":true
      }

    })

  }

  update(event:any){
    this.eventService.put(event.idEvent, event).subscribe(data => {
    })
  }


  eventReceive(event:any){

    let receiveDate = moment(event.event.start).format("YYYY-MM-DD");
    
    if(this.isHoliDay(receiveDate)){
      event.revert()
      return
    }

    let data = {...event.event.extendedProps}
    
    if(event.event.end){
      data.dateEnd = this.parseFecha(event.event.end)
    }
    data.dateStart =this.parseFecha(event.event.start)

    this.update(data)
    event.draggedEl.parentNode.removeChild(event.draggedEl);

  }

  parseFecha(date:any){
    return moment(date).format()
  }


  eventResize(event:any){
    let data = {...event.event.extendedProps}
    data.dateEnd = this.parseFecha(event.event.end)
    data.dateStart =this.parseFecha(event.event.start)
    
    this.update(data)

  }

  eventDrop(event:any){
    
    if(this.isHoliDay(moment(event.event.start).format("YYYY-MM-DD"))) {
      event.revert()
      return 
    }

    let data = {...event.event.extendedProps}
    data.dateEnd = this.parseFecha(event.event.end)
    data.dateStart =this.parseFecha(event.event.start)
    
    this.update(data)
    
  }

  dateClick(event:any){    
    if(this.isHoliDay(moment(event.dateStr).format("YYYY-MM-DD"))) {
      console.log("isHoliday"); 
      return
    }
    
    this.openModal(event)
  }

  openModal(data:any = {}, mostrarinfo = false){
    
    const dialogRef = this.dialog.open(ModalEventComponent, {height:'auto', width:'50%', data:{data, mostrarinfo}, })
    .afterClosed().subscribe(data => {
      if(data == 'creado'){
        this.init()
      }
    });
  }


  isHoliDay(date:any){   
    return this.holidays.includes(date)
  }

}
