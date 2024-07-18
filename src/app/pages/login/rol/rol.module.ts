import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RolPageRoutingModule } from '../../../routes/rol-routing.module';

import { RolPage } from './rol.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RolPageRoutingModule
  ],
  declarations: [RolPage]
})
export class RolPageModule {}
