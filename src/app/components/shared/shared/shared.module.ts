import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonInput } from '@ionic/angular';
import { DriverChipComponent } from '../../driver-chip/driver-chip.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, IonicModule],
  declarations: [
    DriverChipComponent
  ],
  
  exports: [
    DriverChipComponent
  ],
})

export class SharedModule { }







