// Angular
import { Component } from '@angular/core';

// Formly
import { FieldType } from '@ngx-formly/material';

@Component({
  selector: 'app-formly-color-type',
  templateUrl: './formly-color-type.component.html',
  styleUrls: ['./formly-color-type.component.scss']
})
export class FormlyColorTypeComponent extends FieldType {

  override defaultOptions = {
    templateOptions: {
      hideFieldUnderline: true,
      floatLabel: 'always',
    },
  };

}
