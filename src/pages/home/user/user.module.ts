import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPageRoutingModule } from 'src/routes/user-routing.module';

import { UserPage } from './user.page';

import { UpdateemailComponent } from '../../../components/updateemail/updateemail.component';
import { UpdatepasswordComponent } from '../../../components/updatepassword/updatepassword.component';
import { UpdatenameComponent } from '../../../components/updatename/updatename.component';
import { DeleteaccountComponent } from '../../../components/deleteaccount/deleteaccount.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, UserPageRoutingModule],
  declarations: [
    UserPage,
    UpdateemailComponent,
    UpdatepasswordComponent,
    UpdatenameComponent,
    DeleteaccountComponent,
  ],
})
export class UserPageModule {}
