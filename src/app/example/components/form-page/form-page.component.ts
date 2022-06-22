import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import {
  fcButtonToggle,
  fcCheckbox,
  fcColorPicker,
  fcDatepicker,
  fcGridRow,
  fcNumber,
  fcSelect,
  fcTextareaInput,
  fcTextInput,
  fcTimeInput,
  fcToggle
} from '@shared/helpers';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html'
})
export class FormPageComponent implements OnInit {

  fields: FormlyFieldConfig[] = [];
  model: any = {};
  form = new FormGroup({});
  options: FormlyFormOptions = {};

  textInputCode = `
fcTextInput(
  'text', // form control name
  'Text', // label to display
  {
    // config options
    maxLength: 10,
    required: true
  }
)`;

  get saveDisabled(): boolean {
    const edited = this.form.dirty && this.form.touched;
    const valid = this.form.valid;
    return this.form ? !edited || !valid : true;
  }

  ngOnInit(): void {
    this.configureFields();
  }

  configureFields(): void {
    this.fields = [
      fcTextInput(
        'text',
        'Text',
        {
          maxLength: 10,
          required: true
        }
      ),
      fcTextareaInput(
        'textarea',
        'Textarea',
        {}
      ),
      fcGridRow(
        fcColorPicker(
          'colour',
          'Colour',
          {
            required: true
          }
        ),
        fcSelect(
          'select',
          'Select',
          {
            options: [
              { id: 1, name: 'Option 1' },
              { id: 2, name: 'Option 2' },
              { id: 3, name: 'Option 3' },
              { id: 4, name: 'Option 4' },
              { id: 5, name: 'Option 5' }
            ]
          }
        ),
        fcCheckbox(
          'checkbox',
          'Checkbox',
          {}
        )
      ),
      fcGridRow(
        fcDatepicker(
          'date-disabled',
          'Date disabled',
          {
            disabled: true
          }
        ),
        fcDatepicker(
          'date',
          'Date',
          {}
        )
      ),
      fcGridRow(
        fcTimeInput(
          'time',
          'Time',
          {}
        ),
        fcToggle(
          'toggle',
          'Toggle',
          {}
        )
      ),
      fcGridRow(
        fcNumber(
          'number',
          'Number',
          {
            required: true
          }
        )
      ),
      fcButtonToggle(
        'button-toggle',
        'Button Toggle',
        {
          options: [
            { id: 1, name: 'Mon' },
            { id: 2, name: 'Tue' },
            { id: 3, name: 'Wed' },
            { id: 4, name: 'Thu' },
            { id: 5, name: 'Fri' },
            { id: 6, name: 'Sat' },
            { id: 7, name: 'Sun' }
          ]
        }
      )
    ];
  }

  save(): void {
    console.log('model', this.form.getRawValue());
  }
}