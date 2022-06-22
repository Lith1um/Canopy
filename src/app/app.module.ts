import { NgModule } from '@angular/core';
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
import { FormlyButtonToggleTypeComponent, FormlyColorTypeComponent, FormlyRepeatSectionTypeComponent, FormlyTimeTypeComponent } from '@shared/components';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
