import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from 'src/app/models/models';

@Component({
  selector: 'app-information-dialog',
  templateUrl: './information-dialog.component.html',
})
export class InformationDialogComponent {

  constructor(public dialogRef: MatDialogRef<InformationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  close() {
    this.dialogRef.close();
  }
}
