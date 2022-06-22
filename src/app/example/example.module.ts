import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FormPageComponent } from '@example/components';
import { ExampleRoutingModule } from './example-routing.module';

@NgModule({
  imports: [
    ExampleRoutingModule,
    SharedModule
  ],
  declarations: [
    FormPageComponent
  ],
  providers: [],
})
export class ExampleModule {}
