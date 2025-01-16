import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AsidebarService } from './asidebar.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-asidebar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './asidebar.component.html',
  styleUrl: './asidebar.component.css'
})
export class AsidebarComponent implements OnInit{

  public asidebarService = inject(AsidebarService)
  public menuService = inject(MenuService)
  menus:any = []

  constructor( ){ }


  idMenuSelected = computed(() => {
    console.log(this.menuService.currentNavigation());
    
    return this.menuService.currentNavigation().idMenu

  })

  ngOnInit(): void {
    this.menus = this.menuService.getMenu()
  }


  setNavigation(menu:any){
    this.menuService.setNavigation(menu)
    
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
