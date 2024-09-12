import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class EventService extends HttpService{

  constructor(  ) {
    super("events")
  }
}
