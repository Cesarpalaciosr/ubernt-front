import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from '../pages/login/login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
,
  {
    path: 'rol',
    loadChildren: () =>
      import('../pages/login/rol/rol.module').then((m) => m.RolPageModule),
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}

