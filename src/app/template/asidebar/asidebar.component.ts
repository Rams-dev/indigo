import { Component } from '@angular/core';
import { AsidebarService } from './asidebar.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asidebar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
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


  addClass(){
    this.asidebarService.asidebarIsHovered = true;

  }

  removeClass(){
    this.asidebarService.asidebarIsHovered = false;

  }

}
