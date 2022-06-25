import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AlertPageComponent,
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
    path: 'form-page',
    component: FormPageComponent
  },
  {
    path: 'dialogs',
    component: DialogPageComponent
  },
  {
    path: 'login-page',
    component: LoginPageComponent
  },
  {
    path: 'alerts',
    component: AlertPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExampleRoutingModule {}
