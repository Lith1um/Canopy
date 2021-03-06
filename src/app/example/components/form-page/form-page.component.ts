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
  model: any = this.createModel();
  form = new FormGroup({});
  options: FormlyFormOptions = {};

  formClass = 'mat-default';

  get saveDisabled(): boolean {
    const edited = this.form.dirty && this.form.touched;
    const valid = this.form.valid;
    return this.form ? !edited || !valid : true;
  }

  ngOnInit(): void {
    this.configureFields();
  }

  createModel(): any {
    return {
      text: 'some text',
      textarea: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque semper vulputate sagittis. Sed sem lorem, efficitur sit amet elementum at, suscipit nec dui.',
      colour: '#673AB7',
      checkbox: false,
      dateDisabled: '2022-06-12',
      toggle: true,
      number: 45
    }
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
            placeholder: 'Select placeholder',
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
          'dateDisabled',
          'Date disabled',
          {
            disabled: true
          }
        ),
        fcDatepicker(
          'date',
          'Date',
          {
            placeholder: 'DD/MM/YYYY',
            hintText: 'some text to check colours in dark mode'
          }
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

}