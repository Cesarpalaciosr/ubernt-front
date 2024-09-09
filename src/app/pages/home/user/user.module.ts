import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPageRoutingModule } from './user-routing.module';

import { UserPage } from './user.page';

import { UpdateemailComponent } from '../../../components/modals/updateemail/updateemail.component';
import { UpdatepasswordComponent } from '../../../components/modals/updatepassword/updatepassword.component';
import { UpdatenameComponent } from 'src/app/components/modals/updatename/updatename.component'; 
import { DeleteaccountComponent } from '../../../components/modals/deleteaccount/deleteaccount.component';
import { ProfilepictureComponent } from 'src/app/components/modals/profilepicture/profilepicture.component';
import { VehicleformComponent } from 'src/app/components/modals/vehicleform/vehicleform.component';
import { DriverChipComponent } from 'src/app/components/driver-chip/driver-chip.component';
@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, UserPageRoutingModule],
  declarations: [
    UserPage,
    ProfilepictureComponent,
    UpdateemailComponent,
    UpdatepasswordComponent,
    UpdatenameComponent,
    DeleteaccountComponent,
  ],
})
export class UserPageModule {}
