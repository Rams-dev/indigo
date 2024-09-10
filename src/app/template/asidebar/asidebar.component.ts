import { Component } from '@angular/core';
import { AsidebarService } from './asidebar.service';

@Component({
  selector: 'app-asidebar',
  standalone: true,
  imports: [],
  templateUrl: './asidebar.component.html',
  styleUrl: './asidebar.component.css'
})
export class AsidebarComponent {

  constructor( 
    public asidebarService: AsidebarService
  ){

  }
  toggleBottonSideBar(){
    this.asidebarService.static = !this.asidebarService.static
    // this.asidebarService.static$ = false

  }

}
