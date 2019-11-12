import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { YesNoDialogData } from 'src/app/models/models';

@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
})
export class YesNoDialog {
  constructor(public dialogRef: MatDialogRef<YesNoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: YesNoDialogData) { }

  noClick() {
    this.dialogRef.close();
  }
}
