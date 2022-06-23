import { Component, EventEmitter, Input, Optional, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-header',
  templateUrl: './dialog-header.component.html'
})
export class DialogHeaderComponent {

  @Input()
  title: string;

  @Input()
  id: number | string | undefined;

  @Input()
  canMaximise = false;

  @Input()
  closeDialogData: any;

  @Output()
  closed = new EventEmitter<void>();

  constructor(@Optional() public dialogRef: MatDialogRef<any>) {}

  close(): void {
    if (this.dialogRef) {
      this.dialogRef.close(this.closeDialogData);
    } else {
      this.closed.emit();
    }
  }

}
