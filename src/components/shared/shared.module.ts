import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UserButtonComponent } from '../atoms/user-button/user-button.component';
import { ChatModalComponent } from '../chat-modal/chat-modal.component';
import { DeleteaccountComponent } from 'src/services/deleteaccount.component';
import { MapDistanceComponent } from 'src/services/map-distance.component';
import { UpdateemailComponent } from 'src/services/updateemail.component';
import { UpdatenameComponent } from 'src/services/updatename.component';
import { UpdatepasswordComponent } from 'src/services/updatepassword.component';

@NgModule({
  declarations: [
    UserButtonComponent, 
    // ChatModalComponent, 
    DeleteaccountComponent, // no se usa mas de una vez
    MapDistanceComponent,
    UpdateemailComponent, // no se usa mas de una vez
    UpdatenameComponent, // no se usa mas de una vez
    UpdatepasswordComponent // no se usa mas de una vez

   ],

  imports: [CommonModule, IonicModule],

  exports: [
    UserButtonComponent, 
    // ChatModalComponent, 
    DeleteaccountComponent, // no se usa mas de una vez
    MapDistanceComponent,
    UpdateemailComponent, // no se usa mas de una vez
    UpdatenameComponent, // no se usa mas de una vez
    UpdatepasswordComponent // no se usa mas de una vez
  ],
})
export class SharedModule {}
