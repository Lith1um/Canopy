// Angular
import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

// Components
import { ConfirmDialogComponent } from '@shared/components';

//Services
import { DialogService, DialogSize } from './dialog.service';

@Injectable()
export class ConfirmDialogService {

  constructor(private dialog: DialogService) {}

  confirmDelete(message: string = 'Are you sure you want to delete this?', id?: number): MatDialogRef<ConfirmDialogComponent> {
    return this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete?',
        id,
        type: 'delete',
        confirmText: 'Delete',
        message
      },
      size: DialogSize.Auto,
    });
  }

  confirm(message: string, title?: string, id?: number): MatDialogRef<ConfirmDialogComponent> {
    return this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: title ?? 'Confirm',
        id,
        confirmText: 'Okay',
        message
      },
      size: DialogSize.Auto,
    });
  }

}
