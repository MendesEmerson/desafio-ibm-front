import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>{{ data.text }}</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onCancelClick()">Cancelar</button>
      <button mat-button (click)="onConfirmClick()" cdkFocusInitial>Confirmar</button>
    </mat-dialog-actions>
  `,
})
export class DialogAlertComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirmClick(): void {
    this.dialogRef.close('confirm');
  }

  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }
}
