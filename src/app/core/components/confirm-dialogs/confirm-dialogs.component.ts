import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'io-confirm-dialogs',
  templateUrl: './confirm-dialogs.component.html',
  styleUrls: ['./confirm-dialogs.component.scss']
})
export class ConfirmDialogsComponent {

  public message: any;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.message = data.message;
  }

  public onYesOption(): void {
    this.dialogRef.close(this.data);
  }

  public onNoOption(): void  {
    this.dialogRef.close();
  }
}
