// Angular
import { AbstractControl } from '@angular/forms';

/**
 * Gets the control for the field. Formly uses dot notation to construct fields,
 * so this method de-structures the field name to get the relevant control
 */
export function getFormlyFormControl(form: AbstractControl, fieldKey: string): AbstractControl {
  // support dot notation fields in formly
  const fieldTree = fieldKey.split('.');
  // reduce the form to get the control in question
  return fieldTree.reduce<AbstractControl>(
    (formControl: AbstractControl, currVal: string) => formControl.get(currVal)!, form);
}
