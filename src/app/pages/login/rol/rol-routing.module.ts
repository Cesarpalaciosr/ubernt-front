import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RolPage } from './rol.page';

const routes: Routes = [
  {
    path: '',
    component: RolPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolPageRoutingModule {}

