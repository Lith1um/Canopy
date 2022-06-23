// Angular
import { Component, EventEmitter, Input, Optional, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-simple-dialog',
  templateUrl: './simple-dialog.component.html',
  styleUrls: ['./simple-dialog.component.scss']
})
export class SimpleDialogComponent {

  @Input()
  title = 'Title';

  @Input()
  id: number | undefined;

  @Input()
  canMaximise = false;

  @Input()
  classes = '';

  @Output()
  closed = new EventEmitter<void>();

  constructor(@Optional() private dialogRef: MatDialogRef<any>) {}

  /**
   * Close the dialog.
   */
  public close(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    } else {
      this.closed.emit();
    }
  }
}
