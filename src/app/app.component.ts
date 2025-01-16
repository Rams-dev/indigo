import { CommonModule } from '@angular/common';
import { Component, computed, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AsidebarComponent } from './template/asidebar/asidebar.component';
import { FooterComponent } from './template/footer/footer.component';
import { NavbarComponent } from './template/navbar/navbar.component';
import { AsidebarService } from './template/asidebar/asidebar.service';
import { AlertComponent } from "./components/alert/alert.component";
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './components/auth.service';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, AsidebarComponent, FooterComponent, NavbarComponent, RouterLink, RouterLinkActive, AlertComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  static:boolean = true
  isLoged:boolean = false
  
  
  constructor(
    public asidebarService:AsidebarService,
    public authService:AuthService,
    public menuService:MenuService,
    public router:Router,

  ){

  }


  currentTitle = computed(() => {
    return this.menuService.currentNavigation().label
    
  })

  ngOnInit(): void {   
    
    this.asidebarService.static$.subscribe(data => {
      this.static = data
    })

    this.authService.currentUser$.subscribe(data => {
      console.log(data);
      
      if (data != null){
        this.isLoged = true
        this.router.navigate(["/calendar"])
        return
      }

      this.isLoged = false

    })

  }


}
