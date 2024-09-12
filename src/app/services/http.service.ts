import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public urlApi:string = "http://localhost:3999/"
  path:String
  public http:HttpClient = inject(HttpClient)


  

  constructor(
  
    path:String,
    // private toasterService: ToastBarService, 
    // private spinnerService: SpinnerService
    ) { 
      this.path = path

    }


  getAll(): Observable<any> {    
    return this.http.get<any>(this.urlApi + this.path)
      .pipe(
        map( response => {          
        return response;
      }),
      // catchError(this.handleError)
    );
  }


  getOne(id:Number): Observable<any> {    
    return this.http.get<any>(this.urlApi + this.path +"/" + id )
      .pipe(
        map( response => {          
        return response;
      }),
      // catchError(this.handleError)
    );
  }


  post(params: any): Observable<any> {
    return this.http.post<any>(`${this.urlApi}${this.path}`, params)
      .pipe(
        map(response => {
          return response;
        })
        // ,catchError(this.handleError)
        );
  }

  put(id:number, data:any): Observable<any> {
    return this.http.put<any>(`${this.urlApi}${this.path}/${id}`, data)
    .pipe(
      map(response => {
        return response;
      })
      // ,      catchError(this.handleError)
      );
  }

  getByParams(params: any): Observable<any> {
    let paramsUri = '?' 
    for (let param in params){
      paramsUri += `${param}=${params[param]}&`      
    }

    return this.http.get<any>(`${this.urlApi}${this.path}${paramsUri}`)
    .pipe(
      map((response) => {
        return response;
      }),
      // catchError(this.handleError)
    );
  }


  delete(id:number): Observable<any> {
    return this.http.delete<any>(`${this.urlApi}${this.path}/${id}`)
            .pipe(
              map((response) => {
                return response;
              }),
              // catchError(this.handleError)
            );
    
  }
}
