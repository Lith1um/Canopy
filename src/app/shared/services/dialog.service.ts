// Angular
import { ComponentType } from '@angular/cdk/portal';
import { Injectable, ViewContainerRef } from '@angular/core';
import { AutoFocusTarget, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

export enum DialogSize {
  Auto = 'auto',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  XLarge = 'xlarge',
  Max = 'max'
}

export interface DialogConfig {
  data?: any;
  hasBackdrop?: boolean;
  size?: `${DialogSize}`;
  minWidth?: string;
  minHeight?: string;
  autoHeight?: boolean;
  viewContainerRef?: ViewContainerRef;
  autoFocus?: AutoFocusTarget;
}

/**
 * Dialog wrapper for angular material, this allows us to configure pre-canned dialog sizes as well
 * as supporting standard dialog config options
 */
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {}

  open<T>(
    component: ComponentType<T>,
    {
      data = undefined,
      hasBackdrop = true,
      size = DialogSize.Medium,
      minWidth,
      minHeight,
      autoHeight = true,
      autoFocus = 'first-tabbable',
      viewContainerRef
    }: DialogConfig = {
      data: undefined,
      hasBackdrop: true,
      size: DialogSize.Medium,
      autoHeight: true,
      autoFocus: 'first-tabbable'
    }
  ): MatDialogRef<T> {
    const config: MatDialogConfig = {
      data,
      hasBackdrop,
      ...this.getDialogSize(size),
      maxWidth: '95vw',
      maxHeight: '95vh',
      autoFocus,
      minWidth,
      minHeight
    };

    if (autoHeight) {
      config.height = 'auto';
    }

    // override any sizings if custom ones are provided
    if (minWidth) {
      config.minWidth = minWidth;
      config.width = 'auto';
    }
    if (minHeight) {
      config.minHeight = minHeight;
      config.height = 'auto';
    }

    if (viewContainerRef) {
      config.viewContainerRef = viewContainerRef;
    }

    return this.dialog.open(component, config);
  }

  /**
   * Set size for dialogs
   */
  private getDialogSize(size: `${DialogSize}`): { width: string, height: string } {
    switch (size) {
      case DialogSize.Small:
        return { width: '450px', height: '300px' };
      case DialogSize.Medium:
        return { width: '650px', height: '450px' };
      case DialogSize.Large:
        return { width: '850px', height: '600px' };
      case DialogSize.XLarge:
        return { width: '1050px', height: '750px' };
      case DialogSize.Max:
        return { width: '95vw', height: '95vh' };
      case DialogSize.Auto:
      default:
        return { width: 'auto', height: 'auto' };
    }
  }

}
