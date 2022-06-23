import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import {
  BasicDialogComponent,
  CustomDialogComponent,
  DialogPageComponent,
  FormPageComponent,
  HomepageComponent,
  LoginPageComponent
} from '@example/components';
import { ExampleRoutingModule } from './example-routing.module';

@NgModule({
  imports: [
    ExampleRoutingModule,
    SharedModule
  ],
  declarations: [
    BasicDialogComponent,
    CustomDialogComponent,
    DialogPageComponent,
    FormPageComponent,
    HomepageComponent,
    LoginPageComponent
  ],
  providers: [],
})
export class ExampleModule {}
