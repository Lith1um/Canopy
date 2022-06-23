import { Component } from '@angular/core';
import { ConfirmDialogService, DialogService, DialogSize } from '@shared/services';
import { BasicDialogComponent } from './basic-dialog/basic-dialog.component';
import { CustomDialogComponent } from './custom-dialog/custom-dialog.component';

@Component({
  selector: 'app-dialog-page',
  templateUrl: './dialog-page.component.html'
})
export class DialogPageComponent {

  dialogCode = `
this.dialogService.open(
  BasicDialogComponent, // Component to mount in the dialog window
  {
    data: {},
    size: DialogSize.Medium,
    autoHeight: false
  }
);`;
  
  constructor(
    private dialogService: DialogService,
    private confirmDialog: ConfirmDialogService) {}

  openBasicDialog(): void {
    this.dialogService.open(BasicDialogComponent, { size: DialogSize.Small });
  }

  openCustomDialog(): void {
    this.dialogService.open(CustomDialogComponent, { autoHeight: false });
  }

  openConfirmDialog(): void {
    this.confirmDialog.confirm('This is a confirm dialog!');
  }

  openDeleteDialog(): void {
    this.confirmDialog.confirmDelete();
  }

}