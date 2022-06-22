// Angular
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ngxColorsPalette } from '@shared/helpers';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ColorPickerComponent),
    multi: true,
  }],
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements ControlValueAccessor {

  @Input()
  isDisabled: boolean | undefined = false;

  colorPalette = ngxColorsPalette;

  value: any;

  onChange = (val: any): void => {};
  onTouched = (): void => {};

  writeValue(value: any): void {
    this.value = value;
    this.onChange(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
