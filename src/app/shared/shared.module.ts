import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import {
  HorizontalNavigationBasicItemComponent,
  HorizontalNavigationBranchItemComponent,
  HorizontalNavigationComponent,
  HorizontalNavigationSeparatorComponent,
  VerticalNavigationBasicItemComponent,
  VerticalNavigationCollapsibleItemComponent,
  VerticalNavigationComponent,
  VerticalNavigationGroupItemComponent,
  VerticalNavigationSeparatorComponent
} from '@shared/components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [
    HorizontalNavigationComponent,
    HorizontalNavigationBasicItemComponent,
    HorizontalNavigationBranchItemComponent,
    HorizontalNavigationSeparatorComponent,
    VerticalNavigationComponent,
    VerticalNavigationBasicItemComponent,
    VerticalNavigationCollapsibleItemComponent,
    VerticalNavigationGroupItemComponent,
    VerticalNavigationSeparatorComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,

    HorizontalNavigationComponent,
    HorizontalNavigationBasicItemComponent,
    HorizontalNavigationBranchItemComponent,
    HorizontalNavigationSeparatorComponent,
    VerticalNavigationComponent,
    VerticalNavigationBasicItemComponent,
    VerticalNavigationCollapsibleItemComponent,
    VerticalNavigationGroupItemComponent,
    VerticalNavigationSeparatorComponent
  ],
  providers: [],
})
export class SharedModule {}
