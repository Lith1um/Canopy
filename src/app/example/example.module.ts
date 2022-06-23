import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FormPageComponent, HomepageComponent } from '@example/components';
import { ExampleRoutingModule } from './example-routing.module';

@NgModule({
  imports: [
    ExampleRoutingModule,
    SharedModule
  ],
  declarations: [
    FormPageComponent,
    HomepageComponent
  ],
  providers: [],
})
export class ExampleModule {}
