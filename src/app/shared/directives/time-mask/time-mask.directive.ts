// Angular
import {
  BACKSPACE,
  DELETE,
  DOWN_ARROW,
  LEFT_ARROW,
  NINE,
  NUMPAD_NINE,
  NUMPAD_ZERO,
  RIGHT_ARROW,
  TAB,
  UP_ARROW,
  ZERO,
} from '@angular/cdk/keycodes';
import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Inject,
  OnInit,
  Renderer2,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// Moment
import * as moment from 'moment';

@Directive({
  selector: '[appTimeMask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeMaskDirective),
      multi: true,
    }
  ],
})
export class TimeMaskDirective implements OnInit, ControlValueAccessor {

  /** implements ControlValueAccessorInterface */
  _onChange: (_: string | undefined) => void;

  /** implements ControlValueAccessorInterface */
  _touched: () => void;

  private _value: string;

  private _fieldJustGotFocus = false;

  constructor(
    @Self() private _el: ElementRef,
    private _renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(evt: KeyboardEvent): void {

    const keyCode = evt.keyCode;
    switch (keyCode) {
      case LEFT_ARROW:
      case RIGHT_ARROW:
      case TAB:
        this._decideWhetherToJumpAndSelect(keyCode, evt);
        break;

      case DELETE:
      case BACKSPACE:
        this._clearHoursOrMinutes();
        break;

      case DOWN_ARROW:
        this._setInputText(null, -1);
        break;
      case UP_ARROW:
        this._setInputText(null, 1);
        break;

      default:
        if ((keyCode >= ZERO && keyCode <= NINE) ||
          (keyCode >= NUMPAD_ZERO && keyCode <= NUMPAD_NINE)) {
          this._setInputText(evt.key);
        }
    }

    // prevents the component from trying to update itself:
    // 1 - When the user enters a number, it would cause the screen to blink: once because
    // we are swapping the component value over and over again as default typing response
    //     of user
    // 2 - When the user types a key different from the ones above, it must be ignored
    if (keyCode !== TAB) {
      evt.preventDefault();
    }
  }

  @HostListener('click', ['$event'])
  onClick(evt: MouseEvent): void {
    this._fieldJustGotFocus = true;
    const caretPosition = this._doGetCaretPosition();
    if (caretPosition < 3) {
      this._el.nativeElement.setSelectionRange(0, 2);
    } else {
      this._el.nativeElement.setSelectionRange(3, 6);
    }
  }

  @HostListener('focus', ['$event'])
  onFocus(evt: any): void {
    this._fieldJustGotFocus = true;
    const caretPosition = this._doGetCaretPosition();
    if (caretPosition < 3) {
      this._el.nativeElement.setSelectionRange(0, 2);
    } else {
      this._el.nativeElement.setSelectionRange(3, 6);
    }
  }

  @HostListener('blur', ['$event'])
  onBlur(evt: any): void {
    this._touched();
  }

  ngOnInit(): void {
    this._el.nativeElement.style.cursor = 'default';
  }

  /** Implementation for ControlValueAccessor interface */
  writeValue(value: string): void {
    const v = value ?? '--:--';

    this._value = v;

    this._renderer.setProperty(this._el.nativeElement, 'value', v);
  }

  /** Implementation for ControlValueAccessor interface */
  registerOnChange(fn: (_: string | undefined) => void): void {
    this._onChange = fn;
  }

  /** Implementation for ControlValueAccessor interface */
  registerOnTouched(fn: () => void): void {
    this._touched = fn;
  }

  /** Implementation for ControlValueAccessor interface */
  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this._el.nativeElement, 'disabled', isDisabled);
  }

  getHoursInStringAfterAppend(hours: number, valueToAppend: number, limitToReset: number = 24): string {
    const hoursNum = isNaN(hours) ? 0 : hours;

    if (hoursNum <= limitToReset) {
      let valueAfterAppend = hoursNum + valueToAppend;
      if (valueAfterAppend < 0) {
        valueAfterAppend = 23;
      } else if (valueAfterAppend > limitToReset) {
        valueAfterAppend = 1;
      }
      return valueAfterAppend < 10 ? `0${valueAfterAppend}` : `${valueAfterAppend}`;
    }
    return '01';
  }

  getMinutesInStringAfterAppend(minutes: number, valueToAppend: number, limitToReset: number = 60): string {
    const minutesNum = isNaN(minutes) ? 0 : minutes;

    if (minutesNum <= limitToReset) {
      let valueAfterAppend = minutesNum + valueToAppend;
      if (valueAfterAppend < 0) {
        valueAfterAppend =  59; //
      } else if (valueAfterAppend > limitToReset) {
        valueAfterAppend = 0;
      }
      return valueAfterAppend < 10 ? `0${valueAfterAppend}` : `${valueAfterAppend}`;
    }
    return '01';
  }

  private _clearHoursOrMinutes(): void {
    const caretPosition = this._doGetCaretPosition();
    const input: string[] = this._el.nativeElement.value.split(':');

    const hours: string = input[0];
    const minutes: string = input[1];

    let newTime = '';
    let sendCaretToMinutes = false;

    if (caretPosition > 2) {
      newTime = `${hours}:--`;
      sendCaretToMinutes = true;
    } else {
      newTime = `--:${minutes}`;
      sendCaretToMinutes = false;
    }

    this._fieldJustGotFocus = true;

    this._renderer.setProperty(this._el.nativeElement, 'value', newTime);
    this._controlValueChanged();
    if (!sendCaretToMinutes) {
      this._el.nativeElement.setSelectionRange(0, 2);
    } else {
      this._el.nativeElement.setSelectionRange(3, 6);
    }
  }

  private _decideWhetherToJumpAndSelect(keyCode: number, evt?: KeyboardEvent): void {

    const caretPosition = this._doGetCaretPosition();

    switch (keyCode) {
      case RIGHT_ARROW:
        this._el.nativeElement.setSelectionRange(3, 6);
        break;

      case LEFT_ARROW:
        this._el.nativeElement.setSelectionRange(0, 2);
        break;

      case TAB:
        if (caretPosition < 2 && !evt?.shiftKey) {
          this._el.nativeElement.setSelectionRange(3, 6);
          evt?.preventDefault();
        } else if (caretPosition > 2 && evt?.shiftKey) {
          this._el.nativeElement.setSelectionRange(0, 2);
          evt.preventDefault();
        }
    }
    this._fieldJustGotFocus = true;
  }

  private _setInputText(key: string | null, valueToAppend: number = 0): void {
    const input: string[] = this._el.nativeElement.value.split(':');

    let hours: string = input[0];
    let minutes: string = input[1];

    const caretPosition = this._doGetCaretPosition();
    if (caretPosition < 3) {
      hours = this.getHoursInStringAfterAppend(+hours, valueToAppend);
      this._setHours(hours, minutes, key);
    } else {
      minutes = this.getMinutesInStringAfterAppend(+minutes, valueToAppend);
      this._setMinutes(hours, minutes, key);
    }
    this._fieldJustGotFocus = false;
  }

  private _setHours(hours: string, minutes: string, key: string | null): void {
    const hoursArray: string[] = hours.split('');
    const firstDigit: string = hoursArray[0];
    const secondDigit: string = hoursArray[1];

    let newHour = '';

    let completeTime = '';
    let sendCaretToMinutes = false;

    if (key !== null) {
      if (firstDigit === '-' || this._fieldJustGotFocus) {
        newHour = `0${key}`;
        sendCaretToMinutes = Number(key) > 2;
      } else {
        newHour = `${secondDigit}${key}`;
        if (Number(newHour) > 23) {
          newHour = '23';
        }
        sendCaretToMinutes = true;
      }
    } else {
      newHour = `${hours}`;
      if (Number(newHour) > 23) {
        newHour = '00';
      }
      if (Number(newHour) < 0) {
        newHour = '23';
      }
    }

    completeTime = `${newHour}:${minutes}`;

    this._renderer.setProperty(this._el.nativeElement, 'value', completeTime);
    this._controlValueChanged();
    if (!sendCaretToMinutes) {
      this._el.nativeElement.setSelectionRange(0, 2);
    } else {
      this._el.nativeElement.setSelectionRange(3, 6);
      this._fieldJustGotFocus = true;
    }
  }

  private _setMinutes(hours: string, minutes: string, key: string | null): void {
    const minutesArray: string[] = minutes.split('');
    const firstDigit: string = minutesArray[0];
    const secondDigit: string = minutesArray[1];

    let newMinutes = '';

    let completeTime = '';

    if (key !== null) {
      if (firstDigit === '-' || this._fieldJustGotFocus) {
        newMinutes = `0${key}`;
      } else {
        if (Number(minutes) === 59) {
          newMinutes = `0${key}`;
        } else {
          newMinutes = `${secondDigit}${key}`;
          if (Number(newMinutes) > 59) {
            newMinutes = '59';
          }
        }
      }
    } else {
      newMinutes = `${minutes}`;
      if (Number(newMinutes) > 59) {
        newMinutes = '00';
      }
    }

    completeTime = `${hours}:${newMinutes}`;

    this._renderer.setProperty(this._el.nativeElement, 'value', completeTime);
    this._controlValueChanged();
    this._el.nativeElement.setSelectionRange(3, 6);
  }

  private _doGetCaretPosition(): number {

    // Initialize
    let iCaretPos = 0;

    const nativeElement = this._el.nativeElement;

    const document: any = this.document;

    // IE Support
    if (document.hasOwnProperty('selection')) {

      // Set focus on the element
      nativeElement.focus();

      // To get cursor position, get empty selection range
      const oSel = document['selection'].createRange();

      // Move selection start to 0 position
      oSel.moveStart('character', -nativeElement.value.length);

      // The caret position is selection length
      iCaretPos = oSel.text.length;
    } else if (nativeElement.selectionStart || nativeElement.selectionStart === '0') {
      // Firefox support
      iCaretPos = nativeElement.selectionStart;
    }

    // Return results
    return iCaretPos;
  }

  /** Set the NgControl and local value  */
  private _controlValueChanged(): void {
    const value = this._el.nativeElement.value;
    this._value = value;

    const valid = moment(value, 'HH:mm', true).isValid();

    this._onChange(valid ? value : undefined);
  }

}
