import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-confirm-update-dialog',
  templateUrl: './confirm-update-dialog.component.html',
  styleUrls: ['./confirm-update-dialog.component.scss']
})
export class ConfirmUpdateDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { bookId: number }) { }
    
  onNoClick(): void { this.dialogRef.close(false); }
}
