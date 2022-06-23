import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';

// Formly
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import {
  maxLengthValidationMessage,
  maxValidationMessage,
  minLengthValidationMessage,
  minValidationMessage
} from '@shared/helpers';
import { FormlyButtonToggleTypeComponent, FormlyColorTypeComponent, FormlyRepeatSectionTypeComponent, FormlyTextareaTypeComponent, FormlyTimeTypeComponent } from '@shared/components';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    CoreModule.forRoot(),
    SharedModule,

    FormlyMaterialModule,
    FormlyModule.forRoot({
      types: [
        {
          name: 'button-toggle',
          component: FormlyButtonToggleTypeComponent,
          wrappers: ['form-field']
        },
        {
          name: 'color-picker',
          component: FormlyColorTypeComponent,
          wrappers: ['form-field']
        },
        {
          name: 'custom-textarea',
          component: FormlyTextareaTypeComponent,
          wrappers: ['form-field']
        },
        {
          name: 'time',
          component: FormlyTimeTypeComponent,
          wrappers: ['form-field']
        },
        {
          name: 'repeat-section',
          component: FormlyRepeatSectionTypeComponent
        },
      ],
      extras: { lazyRender: false },
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        { name: 'minlength', message: minLengthValidationMessage },
        { name: 'maxlength', message: maxLengthValidationMessage },
        { name: 'min', message: minValidationMessage },
        { name: 'max', message: maxValidationMessage }
      ],
    })
  ],
  providers: [
    {
      provide: LOCALE_ID, useValue: 'en-GB'
    },
    // The mat-form-field has different appearances. We're using the standard one, but I quite like the outlined
    // appearance.
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill', floatLabel: 'always' }
    },
    // Fix the mat date format to use GB locale. If we want to support US format then we'll need to inject
    // MatDateFormat into a service and set dynamically based upon users profile information. But hey, we
    // sell software to the NHS so this is good enough.
    {
      provide: MAT_DATE_LOCALE, useValue: 'en-GB'
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
