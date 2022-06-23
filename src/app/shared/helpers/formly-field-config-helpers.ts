// Formly
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AbstractControl } from '@angular/forms';

// rxjs
import { Observable, of } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';

// Models
import { IdNamePairModel } from '@shared/models';

// Helpers
import { getFormlyFormControl } from './formly-form-helpers';
import { isEqual } from 'lodash';

////////////////////////////////////////////////////////////////////////////////////////
////////// Base Params
////////////////////////////////////////////////////////////////////////////////////////
interface BaseParams {
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  hintText?: string;
  expressionProperties?: {
    [property: string]: string | ((model: any, formState: any, field?: FormlyFieldConfig) => any) | Observable<any>;
  };
  hideExpression?: boolean | string | ((model: any, formState: any, field?: FormlyFieldConfig) => boolean);
  onInit?: (field: any) => void;
  validators?: any;
  validation?: any;
}

////////////////////////////////////////////////////////////////////////////////////////
////////// TextInput Params
////////////////////////////////////////////////////////////////////////////////////////
interface TextInputParams extends BaseParams {
  minLength?: number;
  maxLength?: number;
}

////////////////////////////////////////////////////////////////////////////////////////
////////// TextInput
////////////////////////////////////////////////////////////////////////////////////////
export function fcTextInput(
  key: string,
  label: string,
  {
    required = false,
    disabled,
    placeholder,
    className = '',
    expressionProperties,
    hideExpression,
    onInit,
    hintText,
    validators,
    minLength = 0,
    maxLength = 255
  }: TextInputParams
): FormlyFieldConfig {
  return {
    className,
    key,
    type: 'input',
    templateOptions: {
      label,
      required,
      disabled,
      placeholder,
      minLength,
      maxLength,
      description: hintText
    },
    expressionProperties,
    hideExpression,
    validators,
    hooks: {
      onInit: (field: any): void => {
        if (onInit) {
          onInit(field);
        }
      }
    }
  };
}

////////////////////////////////////////////////////////////////////////////////////////
////////// Password
////////////////////////////////////////////////////////////////////////////////////////
export function fcPassword(
  key: string,
  label: string,
  {
    required = false,
    disabled,
    placeholder,
    className = '',
    expressionProperties,
    hideExpression,
    onInit,
    hintText,
    validators
  }: BaseParams
): FormlyFieldConfig {
  return {
    className,
    key,
    type: 'input',
    templateOptions: {
      type: 'password',
      label,
      required,
      disabled,
      placeholder,
      description: hintText
    },
    expressionProperties,
    hideExpression,
    validators,
    hooks: {
      onInit: (field: any): void => {
        if (onInit) {
          onInit(field);
        }
      }
    }
  };
}

////////////////////////////////////////////////////////////////////////////////////////
////////// TextareaInput Params
////////////////////////////////////////////////////////////////////////////////////////
interface TextareaInputParams extends TextInputParams {
  autosize?: boolean;
  autosizeMinRows?: number;
  autosizeMaxRows?: number;
}

////////////////////////////////////////////////////////////////////////////////////////
////////// TextareaInput
////////////////////////////////////////////////////////////////////////////////////////
export function fcTextareaInput(
  key: string,
  label: string,
  {
    required = false,
    disabled,
    placeholder,
    className = '',
    expressionProperties,
    hideExpression,
    onInit,
    hintText,
    validators,
    minLength = 0,
    maxLength = 255,
    autosize = true,
    autosizeMinRows = 1,
    autosizeMaxRows = 10
  }: TextareaInputParams
): FormlyFieldConfig {
  return {
    className,
    key,
    type: 'custom-textarea',
    templateOptions: {
      label,
      required,
      disabled,
      placeholder,
      minLength,
      maxLength,
      autosize,
      autosizeMinRows,
      autosizeMaxRows,
      description: hintText
    },
    expressionProperties,
    hideExpression,
    validators,
    hooks: {
      onInit: (field: any): void => {
        if (onInit) {
          onInit(field);
        }
      }
    }
  };
}

////////////////////////////////////////////////////////////////////////////////////////
////////// Toggle
////////////////////////////////////////////////////////////////////////////////////////
export function fcToggle(
  key: string,
  label: string,
  {
    required = false,
    disabled,
    placeholder,
    className = '',
    expressionProperties,
    hintText,
    hideExpression,
    onInit,
    validators
  }: BaseParams
): FormlyFieldConfig {
  return {
    className: `mat-no-container ${className}`,
    key,
    type: 'toggle',
    templateOptions: {
      color: 'primary',
      label,
      required,
      disabled,
      placeholder,
      description: hintText
    },
    expressionProperties,
    hideExpression,
    validators,
    hooks: {
      onInit: (field: any): void => {
        if (onInit) {
          onInit(field);
        }
      }
    }
  };
}

////////////////////////////////////////////////////////////////////////////////////////
////////// Select Params
////////////////////////////////////////////////////////////////////////////////////////
interface SelectParams extends BaseParams {
  options: IdNamePairModel[];
  valueProp?: string | ((item: any) => any);
  labelProp?: string | ((item: any) => any);
  emptyOption?: IdNamePairModel;
  multiple?: boolean;
  selectAllOption?: string | null;
  compareWith?: (o1: any, o2: any) => boolean;
}

////////////////////////////////////////////////////////////////////////////////////////
////////// Select
////////////////////////////////////////////////////////////////////////////////////////
export function fcSelect(
  key: string,
  label: string,
  {
    options,
    required = false,
    disabled,
    placeholder,
    className = '',
    expressionProperties,
    hideExpression,
    hintText,
    onInit,
    validators,
    valueProp = 'id',
    labelProp = 'name',
    emptyOption,
    multiple = false,
    selectAllOption = 'Select all',
    compareWith = (o1: any, o2: any): boolean => {
      return valueProp instanceof Function
        ? isEqual(valueProp(o1), valueProp(o2))
        : (o1 === Object(o1) ? o1[valueProp] === o2[valueProp] : o1 === o2);
    },
  }: SelectParams
): FormlyFieldConfig {
  return {
    className,
    key,
    type: 'select',
    templateOptions: {
      label,
      options: !emptyOption
        ? options
        : [emptyOption, ...options],
      required,
      disabled,
      placeholder,
      multiple,
      selectAllOption,
      valueProp,
      labelProp,
      description: hintText,
      compareWith
    },
    expressionProperties,
    hideExpression,
    validators: {
      no_value: {
        expression: (control: AbstractControl, field: FormlyFieldConfig) =>
          !field.templateOptions?.required || !!control.value,
        message: () => 'This field is required',
      },
      ...validators
    },
    hooks: {
      onInit: (field: any): void => {
        if (onInit) {
          onInit(field);
        }
      }
    }
  };
}

////////////////////////////////////////////////////////////////////////////////////////
////////// Dependent Select Params
////////////////////////////////////////////////////////////////////////////////////////
interface DependentSelectParams extends BaseParams {
  options: (value: any) => Observable<IdNamePairModel[]>;
  itemFilter?: (item: any, value: any) => any;
  valueProp?: string | ((item: any) => any);
  labelProp?: string | ((item: any) => any);
  groupProp?: string | ((item: any) => any) | undefined;
  compareWith?: (o1: any, o2: any) => boolean;
  emptyOption?: IdNamePairModel;
  multiple?: boolean,
  allow_nulls?: boolean,
  set_if_one?: boolean,
  setAllOptionsOnChange?: boolean;
  selectAllOption?: string | null,
}

////////////////////////////////////////////////////////////////////////////////////////
////////// Dependent Select
////////////////////////////////////////////////////////////////////////////////////////
export function fcDependentSelect(
  key: string,
  label: string,
  dependentFieldKey: string,
  {
    options,
    required = false,
    disabled,
    placeholder,
    className = '',
    expressionProperties,
    hideExpression,
    hintText,
    onInit,
    validators,
    itemFilter,
    allow_nulls = false,
    valueProp = 'id',
    labelProp = 'name',
    compareWith = (o1: any, o2: any): boolean => {
      return valueProp instanceof Function
        ? isEqual(valueProp(o1), valueProp(o2))
        : (o1 === Object(o1) ? o1[valueProp] === o2[valueProp] : o1 === o2);
    },
    emptyOption,
    groupProp = undefined,
    multiple = false,
    set_if_one = true,
    setAllOptionsOnChange = false,
    selectAllOption = 'Select all'
  }: DependentSelectParams
): FormlyFieldConfig {
  return {
    className,
    key,
    type: 'select',
    templateOptions: {
      label,
      required,
      disabled,
      placeholder,
      multiple,
      selectAllOption,
      valueProp,
      labelProp,
      groupProp,
      description: hintText,
      compareWith: compareWith
    },
    expressionProperties,
    hideExpression,
    validators: {
      no_value: {
        expression: (control: AbstractControl, field: FormlyFieldConfig) =>
          !field.templateOptions?.required || !!control.value,
        message: () => 'This field is required',
      },
      ...validators
    },
    hooks: {
      onInit: (field: any): void => {
        if (onInit) {
          onInit(field);
        }
        const dependentFormControl =  getFormlyFormControl(field.form, dependentFieldKey);
        field.templateOptions.options = dependentFormControl.valueChanges.pipe(
          // Our initial value is the field value
          startWith(dependentFormControl.value),
          // Filter options by dependent field value
          switchMap((value: any) => {
            if (!value && !allow_nulls) {
              return of([]);
            }
            return options(value).pipe(
              map((items) => {
                if (value || allow_nulls) {
                  return itemFilter
                    ? items.filter((item: any) => itemFilter(item, value))
                    : items.filter((item: any) =>
                      item.hasOwnProperty(dependentFieldKey) ? value === item[dependentFieldKey] : true);
                } else {
                  return [];
                }
              }),
              // reset the field if the new options list doesn't contain the value currently assigned
              tap((options) => {
                const getValue = (val: any): any => valueProp instanceof Function ? valueProp(val) : val[valueProp];

                const selectedOptionInList = multiple
                  ? field.formControl.value?.every((val: any) =>
                    !!options.find((option) => isEqual(val, getValue(option))))
                  : options.find((option) => isEqual(field.formControl.value, getValue(option)));
                if (!selectedOptionInList) {
                  field.formControl.reset(multiple ? [] : null);
                }
                if (options.length == 1 && set_if_one) {
                  // @ts-ignore
                  const firstValue = (valueProp instanceof Function) ? valueProp(options[0]) : options[0][valueProp];
                  field.formControl.patchValue(multiple ? [firstValue] : firstValue);
                } else if (multiple && setAllOptionsOnChange) {
                  const allValues = options.map((option) =>
                    (valueProp instanceof Function) ? valueProp(option) : option[valueProp as keyof typeof option]);
                  field.formControl.patchValue(allValues);
                }
              }),
              map((options) => {
                return !emptyOption
                  ? options
                  : [emptyOption, ...options];
              })
            );
          })
        );
      }
    }
  };
}

////////////////////////////////////////////////////////////////////////////////////////
////////// Date picker Params
////////////////////////////////////////////////////////////////////////////////////////
/*interface DatePickerParams extends BaseParams {
}*/

////////////////////////////////////////////////////////////////////////////////////////
////////// Date picker
////////////////////////////////////////////////////////////////////////////////////////
export function fcDatepicker(
  key: string,
  label: string,
  {
    required = false,
    className = '',
    disabled,
    placeholder,
    hintText,
    expressionProperties,
    hideExpression,
    onInit,
    validators
  }: BaseParams
): FormlyFieldConfig {
  return {
    className,
    key,
    type: 'datepicker',
    templateOptions: {
      label,
      required,
      description: hintText,
      disabled,
      placeholder,
    },
    expressionProperties,
    hideExpression,
    validators,
    hooks: {
      onInit: (field: any): void => {
        if (onInit) {
          onInit(field);
        }
      }
    },
  };
}

////////////////////////////////////////////////////////////////////////////////////////
////////// Time Input
////////////////////////////////////////////////////////////////////////////////////////
export function fcTimeInput(
  key: string,
  label: string,
  {
    required = false,
    className,
    disabled,
    placeholder,
    expressionProperties,
    hideExpression,
    onInit,
    hintText,
    validators,
    validation
  }: BaseParams
): FormlyFieldConfig {
  return {
    className,
    key,
    type: 'time',
    templateOptions: {
      label,
      required,
      disabled,
      placeholder,
      description: hintText
    },
    expressionProperties,
    hideExpression,
    validators,
    validation,
    hooks: {
      onInit: (field: any): void => {
        if (onInit) {
          onInit(field);
        }
      }
    }
  };
}

////////////////////////////////////////////////////////////////////////////////////////
////////// ButtonToggle Params
////////////////////////////////////////////////////////////////////////////////////////
interface ButtonToggleParams extends BaseParams {
  options: IdNamePairModel[];
}

////////////////////////////////////////////////////////////////////////////////////////
////////// ButtonToggle
////////////////////////////////////////////////////////////////////////////////////////
export function fcButtonToggle(
  key: string,
  label: string,
  {
    required = false,
    disabled,
    placeholder,
    className = '',
    options,
    hintText,
    onInit,
    validators,
    expressionProperties,
    hideExpression,
  }: ButtonToggleParams,
): FormlyFieldConfig {
  return {
    className: `mat-no-container ${className}`,
    key,
    type: 'button-toggle',
    templateOptions: {
      label,
      options,
      required,
      disabled,
      placeholder,
      description: hintText
    },
    validators,
    expressionProperties,
    hideExpression,
    hooks: {
      onInit: (field: any): void => {
        if (onInit) {
          onInit(field);
        }
      }
    }
  };
}

////////////////////////////////////////////////////////////////////////////////////////
////////// Checkbox Params
////////////////////////////////////////////////////////////////////////////////////////
// interface CheckboxSelectParams extends BaseParams {
// }

////////////////////////////////////////////////////////////////////////////////////////
////////// Checkbox
////////////////////////////////////////////////////////////////////////////////////////
export function fcCheckbox(
  key: string,
  label: string,
  {
    required = false,
    disabled,
    placeholder,
    className = '',
    hintText,
    onInit,
    validators,
    expressionProperties,
    hideExpression,
  }: BaseParams
): FormlyFieldConfig {
  return {
    className: `mat-no-container ${className}`,
    key,
    type: 'checkbox',
    templateOptions: {
      color: 'primary',
      label,
      required,
      disabled,
      placeholder,
      description: hintText
    },
    validators,
    expressionProperties,
    hideExpression,
    hooks: {
      onInit: (field: any) => {
        if (onInit) {
          onInit(field);
        }
      }
    }
  };
}

////////////////////////////////////////////////////////////////////////////////////////
////////// ColorPicker
////////////////////////////////////////////////////////////////////////////////////////
export function fcColorPicker(
  key: string,
  label: string,
  {
    required = false,
    disabled,
    className = '',
    hintText,
    onInit,
    validators,
    expressionProperties,
    hideExpression,
  }: BaseParams
): FormlyFieldConfig {
  return {
    className: `mat-no-container ${className}`,
    key,
    type: 'color-picker',
    defaultValue: '#ffffff',
    templateOptions: {
      label,
      required,
      disabled,
      description: hintText
    },
    validators,
    expressionProperties,
    hideExpression,
    hooks: {
      onInit: (field: any) => {
        if (onInit) {
          onInit(field);
        }
      }
    }
  };
}

////////////////////////////////////////////////////////////////////////////////////////
////////// Number Params
////////////////////////////////////////////////////////////////////////////////////////
interface NumberParams extends BaseParams {
  min?: number;
  max?: number;
}

////////////////////////////////////////////////////////////////////////////////////////
////////// Number
////////////////////////////////////////////////////////////////////////////////////////

export function fcNumber(
  key: string,
  label: string,
  {
    required = false,
    disabled,
    placeholder,
    className = '',
    expressionProperties,
    hideExpression,
    hintText,
    onInit,
    validators,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER
  }: NumberParams
): FormlyFieldConfig {
  return {
    className,
    key,
    type: 'input',
    templateOptions: {
      type: 'number',
      label,
      required,
      disabled,
      placeholder,
      min,
      max,
      description: hintText
    },
    expressionProperties,
    hideExpression,
    validators,
    hooks: {
      onInit: (field: any): void => {
        if (onInit) {
          onInit(field);
        }
      }
    }
  };
}

////////////////////////////////////////////////////////////////////////////////////////
////////// Repeat Section
////////////////////////////////////////////////////////////////////////////////////////
interface RepeatSectionParams {
  fields: FormlyFieldConfig[];
  addButtonText?: string;
  initialModel?: any;
  className?: string;
}

export function fcRepeatSection(
  key: string,
  {
    fields,
    className,
    addButtonText = 'Add',
    initialModel
  }: RepeatSectionParams
): FormlyFieldConfig {
  return {
    key,
    className,
    type: 'repeat-section',
    templateOptions: {
      addButtonText,
      initialModel
    },
    fieldArray: {
      fieldGroup: fields
    }
  };
}

export function fcInlineForm(...fields: FormlyFieldConfig[]): FormlyFieldConfig {
  return {
    fieldGroupClassName: `mat-inline`,
    fieldGroup: fields
  };
}

export function fcDenseForm(...fields: FormlyFieldConfig[]): FormlyFieldConfig {
  return {
    fieldGroupClassName: `mat-dense`,
    fieldGroup: fields
  };
}

export function fcGridRow(...fields: FormlyFieldConfig[]): FormlyFieldConfig {
  return {
    fieldGroupClassName: `grid justify-items-stretch items-start gap-x-4 grid-cols-1 md:grid-cols-auto`,
    fieldGroup: fields
  };
}

////////////////////////////////////////////////////////////////////////////////////////
////////// Field Updater
////////////////////////////////////////////////////////////////////////////////////////
export function fcUpdateOnFieldChanges(...dependentFieldKeys: string[]): (field: any) => void {
  return (field: FormlyFieldConfig | undefined): void => {
    if (!field) {
      return;
    }

    dependentFieldKeys.forEach((fieldKey: string) => {
      const dependentFormControl = field.form?.get(fieldKey);
      dependentFormControl?.valueChanges.subscribe(() => {
        field.formControl?.markAsTouched();
        field.formControl?.updateValueAndValidity();
      });
    });
  };
}
