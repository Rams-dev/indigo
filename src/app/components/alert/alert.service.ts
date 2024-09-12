import { inject, Injectable } from '@angular/core';
// import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AlertComponent } from './alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private _snackBar = inject(MatSnackBar);

  durationInSeconds = 5;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  // openSnackBar() {
  //   this._snackBar.openFromComponent(AlertComponent, {
  //     duration: this.durationInSeconds * 1000,
  //   });
  // }

  openSnackBar(message:string) {
    this._snackBar.open(message, 'cerrar', {
      duration: this.durationInSeconds * 1000,
      // horizontalPosition: this.horizontalPosition,
      // verticalPosition: this.verticalPosition,
    });
  }
}
