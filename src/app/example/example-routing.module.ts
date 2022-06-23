import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPageComponent, HomepageComponent } from '@example/components';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'form-example',
    component: FormPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExampleRoutingModule {}
