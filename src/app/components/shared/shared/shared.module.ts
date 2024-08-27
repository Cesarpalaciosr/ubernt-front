import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonInput } from '@ionic/angular';
import { UserButtonComponent } from 'src/app/components/buttons/user-button/user-button.component';
import { DeleteaccountComponent } from '../../modals/deleteaccount/deleteaccount.component';
// import { MapDistanceComponent } from '../../map-distance/map-distance.component';
import { UpdateemailComponent } from 'src/app/components/modals/updateemail/updateemail.component';
import { UpdatenameComponent } from '../../modals/updatename/updatename.component';
import { UpdatepasswordComponent } from '../../modals/updatepassword/updatepassword.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, IonicModule],
  declarations: [
    // IonInput,
    UserButtonComponent, 
    DeleteaccountComponent, // no se usa mas de una vez
    UpdateemailComponent, // no se usa mas de una vez
    UpdatenameComponent, // no se usa mas de una vez
    UpdatepasswordComponent, // no se usa mas de una vez
  ],
  
  exports: [
    // IonInput,
    UserButtonComponent, 
    DeleteaccountComponent, // no se usa mas de una vez
    UpdateemailComponent, // no se usa mas de una vez
    UpdatenameComponent, // no se usa mas de una vez
    UpdatepasswordComponent // no se usa mas de una vez
  ],
})

export class SharedModule { }







