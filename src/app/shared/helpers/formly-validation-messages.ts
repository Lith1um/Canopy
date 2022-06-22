// Formly
import { FormlyFieldConfig } from '@ngx-formly/core';

export function minLengthValidationMessage(err: any, field: FormlyFieldConfig): string {
  return `Should have at least ${field.templateOptions!.minLength} characters`;
}

export function maxLengthValidationMessage(err: any, field: FormlyFieldConfig): string {
  return `This value should be less than ${field.templateOptions!.maxLength} characters`;
}

export function minValidationMessage(err: any, field: FormlyFieldConfig): string {
  return `This value should be more than ${field.templateOptions!.min}`;
}

export function maxValidationMessage(err: any, field: FormlyFieldConfig): string {
  return `This value should be less than ${field.templateOptions!.max}`;
}
