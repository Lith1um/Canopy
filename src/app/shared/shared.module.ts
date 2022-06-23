import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import {
  ColorPickerComponent,
  FormlyButtonToggleTypeComponent,
  FormlyColorTypeComponent,
  FormlyRepeatSectionTypeComponent,
  FormlyTextareaTypeComponent,
  FormlyTimeTypeComponent,
  HorizontalNavigationBasicItemComponent,
  HorizontalNavigationBranchItemComponent,
  HorizontalNavigationComponent,
  HorizontalNavigationSeparatorComponent,
  JsonComponent,
  PageContainerComponent,
  VerticalNavigationBasicItemComponent,
  VerticalNavigationCollapsibleItemComponent,
  VerticalNavigationComponent,
  VerticalNavigationGroupItemComponent,
  VerticalNavigationSeparatorComponent
} from '@shared/components';

// Formly
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyModule } from '@ngx-formly/core';
import { FormlySelectModule } from '@ngx-formly/core/select';

import { NgxColorsModule } from 'ngx-colours';
import { TimeMaskDirective } from '@shared/directives';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    
    NgxColorsModule,

    // Formly
    FormlyMatToggleModule,
    FormlyMatDatepickerModule,
    FormlyMaterialModule,
    FormlySelectModule,
    FormlyModule,
  ],
  declarations: [
    ColorPickerComponent,
    HorizontalNavigationComponent,
    HorizontalNavigationBasicItemComponent,
    HorizontalNavigationBranchItemComponent,
    HorizontalNavigationSeparatorComponent,
    VerticalNavigationComponent,
    VerticalNavigationBasicItemComponent,
    VerticalNavigationCollapsibleItemComponent,
    VerticalNavigationGroupItemComponent,
    VerticalNavigationSeparatorComponent,
    JsonComponent,
    FormlyButtonToggleTypeComponent,
    FormlyColorTypeComponent,
    FormlyTextareaTypeComponent,
    FormlyRepeatSectionTypeComponent,
    FormlyTimeTypeComponent,
    PageContainerComponent,

    TimeMaskDirective
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,

    // Formly
    FormlyMatToggleModule,
    FormlyMatDatepickerModule,
    FormlyMaterialModule,
    FormlySelectModule,
    FormlyModule,

    ColorPickerComponent,
    HorizontalNavigationComponent,
    HorizontalNavigationBasicItemComponent,
    HorizontalNavigationBranchItemComponent,
    HorizontalNavigationSeparatorComponent,
    VerticalNavigationComponent,
    VerticalNavigationBasicItemComponent,
    VerticalNavigationCollapsibleItemComponent,
    VerticalNavigationGroupItemComponent,
    VerticalNavigationSeparatorComponent,
    JsonComponent,
    PageContainerComponent
  ],
  providers: [],
})
export class SharedModule {}
