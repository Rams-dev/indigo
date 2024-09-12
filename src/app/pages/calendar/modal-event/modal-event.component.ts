import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormEventComponent } from '../../events/form-event/form-event.component';

@Component({
  selector: 'app-modal-event',
  standalone: true,
  imports: [MatDialogModule, MatDialogActions, FormEventComponent],
  templateUrl: './modal-event.component.html',
  styleUrl: './modal-event.component.css'
})
export class ModalEventComponent {

  readonly dialogRef = inject(MatDialogRef<ModalEventComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  close(){
    this.dialogRef.close();
  }

}
