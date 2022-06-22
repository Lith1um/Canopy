import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { Moment, MomentFormatSpecification, MomentInput } from 'moment';

const moment = _moment;

export interface MatCustomDateAdapterOptions {
  /**
   * When enabled, the dates have to match the format exactly.
   * See https://momentjs.com/guides/#/parsing/strict-mode/.
   */
  strict: boolean;
  /**
   * Turns the use of utc dates on or off.
   * Changing this will change how Angular Material components like DatePicker output dates.
   */
  useUtc: boolean;
  /**
   * set the model string value
   */
  format: string
}

/** InjectionToken for moment date adapter to configure options. */
export const MAT_CUSTOM_DATE_ADAPTER_OPTIONS = new InjectionToken<MatCustomDateAdapterOptions>(
  'MAT_CUSTOM_DATE_ADAPTER_OPTIONS',
  {
    providedIn: 'root',
    factory: MAT_CUSTOM_DATE_ADAPTER_OPTIONS_FACTORY,
  },
);

/** @docs-private */
export function MAT_CUSTOM_DATE_ADAPTER_OPTIONS_FACTORY(): MatCustomDateAdapterOptions {
  return DEFAULT_CUSTOM_DATE_ADAPTER_OPTIONS;
}

export const DEFAULT_CUSTOM_DATE_ADAPTER_OPTIONS: MatCustomDateAdapterOptions = {
  strict: false,
  useUtc: true,
  format: 'YYYY-MM-DD'
};

/** Creates an array and fills it with values. */
function range<T>(length: number, valueFunction: (index: number) => T): T[] {
  const valuesArray = Array(length);
  for (let i = 0; i < length; i++) {
    valuesArray[i] = valueFunction(i);
  }
  return valuesArray;
}

/** Adapts Moment.js Dates to use string value for use with Angular Material. */
@Injectable()
export class CustomDateAdapter extends DateAdapter<String> {

  private _localeData: {
    firstDayOfWeek: number;
    longMonths: string[];
    shortMonths: string[];
    dates: string[];
    longDaysOfWeek: string[];
    shortDaysOfWeek: string[];
    narrowDaysOfWeek: string[];
  };

  constructor(
    @Optional() @Inject(MAT_DATE_LOCALE) public dateLocale: string,
    @Optional() @Inject(MAT_CUSTOM_DATE_ADAPTER_OPTIONS) private _options: MatCustomDateAdapterOptions,
  ) {
    super();
    this.setLocale(dateLocale || moment.locale());
  }

  override setLocale(locale: string): void {
    super.setLocale(locale);

    moment.updateLocale(locale, {
      calendar: {
        lastDay: '[Yesterday at] LT',
        sameDay: '[Today at] LT',
        nextDay: '[Tomorrow at] LT',
        lastWeek: '[Last] dddd - LT',
        nextWeek: '[Next] dddd - LT',
        sameElse: 'LT - LL'
      }
    });

    let momentLocaleData = moment.localeData(locale);
    this._localeData = {
      firstDayOfWeek: momentLocaleData.firstDayOfWeek(),
      longMonths: momentLocaleData.months(),
      shortMonths: momentLocaleData.monthsShort(),
      dates: range(31, i => moment(this.createDate(2017, 0, i + 1)).format('D')),
      longDaysOfWeek: momentLocaleData.weekdays(),
      shortDaysOfWeek: momentLocaleData.weekdaysShort(),
      narrowDaysOfWeek: momentLocaleData.weekdaysMin(),
    };
  }

  override getValidDateOrNull(val: string): string | null {
    return this.isValid(val) ? val : null;
  }

  getYear(date: string): number {
    return this.clone(date).year();
  }

  getMonth(date: string): number {
    return this.clone(date).month();
  }

  getDate(date: string): number {
    return this.clone(date).date();
  }

  getDayOfWeek(date: string): number {
    return this.clone(date).day();
  }

  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    // Moment.js doesn't support narrow month names, so we just use short if narrow is requested.
    return style == 'long' ? this._localeData.longMonths : this._localeData.shortMonths;
  }

  getDateNames(): string[] {
    return this._localeData.dates;
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    if (style == 'long') {
      return this._localeData.longDaysOfWeek;
    }
    if (style == 'short') {
      return this._localeData.shortDaysOfWeek;
    }
    return this._localeData.narrowDaysOfWeek;
  }

  getYearName(date: string): string {
    return this.clone(date).format('YYYY');
  }

  getFirstDayOfWeek(): number {
    return this._localeData.firstDayOfWeek;
  }

  getNumDaysInMonth(date: string): number {
    return this.clone(date).daysInMonth();
  }

  // @ts-ignore
  clone(date: string): Moment {
    return moment(date).clone().locale(this.locale);
  }

  createDate(year: number, month: number, date: number): string {
    // Moment.js will create an invalid date if any of the components are out of bounds, but we
    // explicitly check each case so we can throw more descriptive errors.
    if (month < 0 || month > 11) {
      throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
    }

    if (date < 1) {
      throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
    }

    const result = this._createMoment({ year, month, date }).locale(this.locale);

    // If the result isn't valid, the date must have been out of bounds for this month.
    if (!result.isValid()) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }

    return result.format(this._options.format);
  }

  today(): string {
    return this._createMoment().locale(this.locale).format(this._options.format);
  }

  parse(value: any, parseFormat: string | string[]): String | null {
    if (value && typeof value == 'string') {
      return this._createMoment(value, parseFormat, this.locale).format(this._options.format);
    }
    return value ? this._createMoment(value).locale(this.locale).format(this._options.format) : null;
  }

  format(date: string, displayFormat: string): string {
    const momentDate = this.clone(date);
    if (!this.isValid(date)) {
      throw Error('MomentDateAdapter: Cannot format invalid date.');
    }
    return momentDate.format(displayFormat);
  }

  addCalendarYears(date: string, years: number): string {
    return this.clone(date).add({ years }).format(this._options.format);
  }

  addCalendarMonths(date: string, months: number): string {
    return this.clone(date).add({ months }).format(this._options.format);
  }

  addCalendarDays(date: string, days: number): string {
    return this.clone(date).add({ days }).format(this._options.format);
  }

  toIso8601(date: string): string {
    return this.clone(date).format();
  }

  /**
   * Returns the given value if given a valid Moment or null. Deserializes valid ISO 8601 strings
   * (https://www.ietf.org/rfc/rfc3339.txt) and valid Date objects into valid Moments and empty
   * string into null. Returns an invalid date for all other values.
   */
  override deserialize(value: any): String | null {
    let date;
    if (value instanceof Date) {
      date = this._createMoment(value).locale(this.locale);
    } else if (this.isDateInstance(value)) {
      // Note: assumes that cloning also sets the correct locale.
      return this.clone(value).format(this._options.format);
    }
    if (typeof value === 'string') {
      if (!value) {
        return null;
      }
      date = this._createMoment(value, moment.ISO_8601).locale(this.locale);
    }
    if (date && this.isValid(date.format(this._options.format))) {
      return this._createMoment(date).locale(this.locale).format(this._options.format);
    }
    return super.deserialize(value);
  }

  isDateInstance(obj: any): boolean {
    return moment.isMoment(obj);
  }

  isValid(date: string): boolean {
    if (date === 'Invalid date') {
      return false;
    }
    return this.clone(date).isValid();
  }

  // @ts-ignore
  invalid(): Moment {
    return moment.invalid();
  }

  /** Creates a Moment instance while respecting the current UTC settings. */
  private _createMoment(
    date?: MomentInput,
    format?: MomentFormatSpecification,
    locale?: string,
  ): Moment {
    const { strict, useUtc }: MatCustomDateAdapterOptions = this._options;

    return useUtc
      ? moment.utc(date, format, locale, strict)
      : moment(date, format, locale, strict);
  }
}
