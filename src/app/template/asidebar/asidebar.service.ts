import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsidebarService {

  static$ = new BehaviorSubject<boolean>(true)
  asidebarIsHovered = false;
  static:boolean = true

  constructor() { 

  }



}
