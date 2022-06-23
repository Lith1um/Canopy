import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  DialogPageComponent,
  FormPageComponent,
  HomepageComponent,
  LoginPageComponent
} from '@example/components';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'form-example',
    component: FormPageComponent
  },
  {
    path: 'dialog-example',
    component: DialogPageComponent
  },
  {
    path: 'login-example',
    component: LoginPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExampleRoutingModule {}
