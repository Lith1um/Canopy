// Angular
import { Component, OnInit } from '@angular/core';

// Formly
import { FieldType } from '@ngx-formly/material';

@Component({
  selector: 'app-formly-button-toggle-type',
  templateUrl: './formly-button-toggle-type.component.html',
  styleUrls: ['./formly-button-toggle-type.component.scss']
})
export class FormlyButtonToggleTypeComponent extends FieldType implements OnInit {

  override defaultOptions = {
    templateOptions: {
      hideFieldUnderline: true,
      floatLabel: 'always',
      multiple: false
    },
  };

}
