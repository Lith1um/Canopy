// Angular
import { Component, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

// Services
import { DialogSizeStateService } from '@shared/services';

@Component({
  selector: 'app-dialog-maximise',
  templateUrl: './dialog-maximise.component.html'
})
export class DialogMaximiseComponent {

  dialogHeight: string;
  dialogWidth: string;
  maximised = false;

  constructor(
    private dialogRef: MatDialogRef<any>,
    @Optional() private dialogSizeStateService: DialogSizeStateService) {}

  maximise(): void {
    if (this.maximised) {
      this.dialogRef.updateSize(this.dialogWidth, this.dialogHeight);
    } else {
      this.dialogHeight = this.dialogRef._containerInstance._config.height ?? 'auto';
      this.dialogWidth = this.dialogRef._containerInstance._config.width ?? 'auto';
      this.dialogRef.updateSize('95vw', '95vh');
    }
    this.maximised = !this.maximised;
    this.dialogSizeStateService?.setMaximised(this.maximised);
  }

}
