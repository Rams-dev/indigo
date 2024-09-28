import { Injectable } from '@angular/core';
import { HttpService } from '../services/http.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpService{

  currentUser:any = []
  currentUser$ = new BehaviorSubject<any>(this.getCurrentUser())

  constructor(private router:Router) {
    super("auth")
    
  }


  auth(data:any){
    return this.post(data)
  }


  getCurrentUser(){
    let user = localStorage.getItem("currentUser")
    if(user){
      let userObj = JSON.parse(user)

      return userObj
    }

    return null

    
  }


  setCurrenUser(user:any){
    let userJson = JSON.stringify(user)
    localStorage.setItem('currentUser', userJson)
  }



  revokeUser(){
    localStorage.removeItem('currentUser')
    this.currentUser$.next(null)
    this.currentUser = null
    this.router.navigate(['/login'])
  }


  
  



}
