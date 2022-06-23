import { AfterContentChecked, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dialog-footer',
  templateUrl: './dialog-footer.component.html'
})
export class DialogFooterComponent implements AfterContentChecked {

  @ViewChild('actions') actionButtons: ElementRef;

  @ViewChild('buttons') buttons: ElementRef;

  hideFooter = false;

  ngAfterContentChecked(): void {
    this.hideFooter = !this.actionButtons?.nativeElement.children.length
      && !this.buttons?.nativeElement.children.length;
  }

}
