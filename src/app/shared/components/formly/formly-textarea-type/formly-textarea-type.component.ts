import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { AfterViewInit, Component, NgZone, ViewChild } from '@angular/core';

// Formly
import { FieldType } from '@ngx-formly/material';

// rxjs
import { take } from 'rxjs';

@Component({
  selector: 'app-formly-textarea-type',
  templateUrl: './formly-textarea-type.component.html'
})
export class FormlyTextareaTypeComponent extends FieldType implements AfterViewInit {

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(private _ngZone: NgZone) {
    super();
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();

    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

}
