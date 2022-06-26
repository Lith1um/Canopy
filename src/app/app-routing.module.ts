import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '@core/components';
import { LoginComponent } from '@core/components';
import { AuthGuard } from '@shared/guards';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'app'
  },
  {
    path: 'app',
    canActivate: [AuthGuard],
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
