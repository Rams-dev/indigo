import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';


@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpService{

  constructor() {
    super( "user")
  }


  activarUsuario(id:number){
    return this.http.put(`${this.urlApi}${"user/activate"}/${id}`, {})
    // let api = new HttpService("user/activate")
    // return api.put(id,{})

  }
}
