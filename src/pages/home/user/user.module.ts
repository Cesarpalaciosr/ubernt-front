import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPageRoutingModule } from 'src/routes/user-routing.module';

import { UserPage } from './user.page';

import { UpdateemailComponent } from 'src/services/updateemail.component';
import { UpdatepasswordComponent } from 'src/services/updatepassword.component';
import { UpdatenameComponent } from 'src/services/updatename.component';
import { DeleteaccountComponent } from 'src/services/deleteaccount.component';
import { SharedModule } from 'src/components/shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, UserPageRoutingModule],
  declarations: [
     UserPage,
    // UpdateemailComponent,
    // UpdatepasswordComponent,
    // UpdatenameComponent,
    // DeleteaccountComponent,
  ],
})
export class UserPageModule {}
