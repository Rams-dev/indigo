import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  idMenuSelected: number = 1
  currentNavigation = signal(this.getNavigationFromLocalStorage())

  constructor() { }

  menus:any = [
    {"idMenu":1, "label":"Calendario", "link":"/calendar", "icon":"far fa-calendar"},
    {"idMenu":2, "label":"Usuarios", "link":"/usuarios", "icon":"fas fa-users"},
    {"idMenu":3, "label":"Días festivos", "link":"/holidays", "icon":"fas fa-calendar-check"},
  ]


  getMenu(){
    return this.menus

  }


  getNavigationFromLocalStorage(){
    // let defaulTitle = this.menus[0]?.label
    let navigation:any = {}
    if(localStorage.getItem('navigation')){
      navigation = JSON.parse(localStorage.getItem('navigation') ?? '')
    } 

    return navigation

  }

  setNavigation(menu:any){
    this.currentNavigation.set(menu)
    let jsonMenu = JSON.stringify(menu)
    localStorage.setItem('navigation', jsonMenu)

  }




}
