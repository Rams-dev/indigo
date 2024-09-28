import { Component, OnInit, Renderer2 } from '@angular/core';
import { AsidebarService } from '../asidebar/asidebar.service';
import { AuthService } from '../../components/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  isOpenNav:boolean = false
  currentUser:any
  isOpenAsideNav:boolean = false
  claseAsideBar = 'wf-fontawesome5solid-n4-active wf-fontawesome5regular-n4-active wf-simplelineicons-n4-active wf-publicsans-n3-active wf-publicsans-n4-active wf-publicsans-n5-active wf-publicsans-n6-active wf-publicsans-n7-active wf-fontawesome5brands-n4-active wf-active sidebar-color nav_open'
  clases =        'wf-fontawesome5solid-n4-active wf-fontawesome5regular-n4-active wf-simplelineicons-n4-active wf-publicsans-n3-active wf-publicsans-n4-active wf-publicsans-n5-active wf-publicsans-n6-active wf-publicsans-n7-active wf-fontawesome5brands-n4-active wf-active sidebar-color topbar_open'
  constructor(
    public authService:AuthService
  ){
    
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(data => {
      console.log(data);
      if (data){
        this.currentUser = data
      }else{
        this.currentUser = null
      
      }
    })
  }

  openNav(){

    this.isOpenNav = !this.isOpenNav
    let arrayclases = this.clases.split(" ")
    arrayclases.forEach(clase => {
        if(this.isOpenNav){
          document.documentElement.classList.add(clase);
        }else{
          document.documentElement.classList.remove(clase);
        }
      })

  }

  logout(){
    this.authService.revokeUser()
  }



  openasideNav(){
    this.isOpenAsideNav = !this.isOpenAsideNav
    let arrayclases = this.claseAsideBar.split(" ")
    arrayclases.forEach(clase => {
        if(this.isOpenAsideNav){
          document.documentElement.classList.add(clase);
        }else{
          document.documentElement.classList.remove(clase);
        }
      })

  }

}
