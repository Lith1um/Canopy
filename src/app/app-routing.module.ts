import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '@core/components';
import { LoginComponent } from '@core/components';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'app'
  },
  {
    path: 'app',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@example/example.module').then(m => m.ExampleModule)
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
