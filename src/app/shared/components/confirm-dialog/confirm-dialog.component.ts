import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  title: string;
  id: number;
  type: 'default' | 'delete';
  confirmText: string;
  message: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: { title: string, id: number, type: 'default' | 'delete', confirmText: string, message: string }) {
    this.title = data?.title;
    this.id = data?.id;
    this.type = data?.type || 'default';
    this.confirmText = data?.confirmText ?? 'Confirm';
    this.message = data?.message;
  }

}
