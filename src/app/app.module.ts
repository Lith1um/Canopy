import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';

// webstorage
import { NgxWebstorageModule } from 'ngx-webstorage';

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
import { StartUpService } from '@core/services';

/**
 * Simple app initializer that attempts to set state in the app if not done so already
 */
 export function initializeApp(startUpService: StartUpService): () => Promise<any> {
  return (): Promise<any> => {
    return startUpService.initApp();
  };
}

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

    NgxWebstorageModule.forRoot(),

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
    // The mat-form-field has different appearances. We're using the standard one as our overrides rely on the class this creates
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill', floatLabel: 'always' }
    },
    {
      provide: MAT_DATE_LOCALE, useValue: 'en-GB'
    },
    // App initializer
    {
      provide: APP_INITIALIZER, useFactory: initializeApp, deps: [StartUpService], multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
