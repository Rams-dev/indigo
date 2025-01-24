import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { HttpService } from "../services/http.service";
import { AuthService } from "../components/auth.service";
import { catchError, Observable, throwError } from "rxjs";
import { AlertService } from "../components/alert/alert.service";


@Injectable()
export class Interceptor implements HttpInterceptor {
    // Inject the current `AuthService` and use it to get an authentication token:
    
    alertService = inject(AlertService)
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = inject(AuthService).getCurrentUser();
        const authToken = currentUser.token

        // Clone the request to add the authentication header.
        const newReq = req.clone({
          headers: req.headers.append('auth-token', authToken),
        });
    
        return next.handle(newReq).pipe(
            catchError((error:HttpErrorResponse) => {
                return throwError(() => {
                    let message = ''
                    if(error.status == 0){
                        message = 'Error no esta disponible'
                        
                    }
                    if(error.status == 401 || error.status == 400){
                        message = error.error                        
                    }
                    
                    this.alertService.openSnackBar(message)
                    
                    console.log(error)
                })
            }
        ));
        
    }
    
  }