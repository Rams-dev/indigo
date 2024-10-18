import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class HolidayService extends HttpService {

  constructor() { 
    super("holidays")
  }
}