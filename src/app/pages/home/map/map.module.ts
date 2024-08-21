import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MapPage } from './map.page';
import { MapPageRoutingModule } from 'src/app/routes/map-routing.module';

import { MapDistanceComponent } from 'src/app/components/map-distance/map-distance.component';
import { UserButtonComponent } from 'src/app/components/atoms/user-button/user-button.component'; 
import { LocationSearchModalComponent } from 'src/app/components/location-search-modal/location-search-modal.component';
import { WaitDriverComponent } from 'src/app/components/wait-driver/wait-driver.component';
import { ToggleSwitchComponent } from 'src/app/components/toggle-switch/toggle-switch.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapPageRoutingModule,
  ],
  declarations: [
    MapPage,
    MapDistanceComponent,
    UserButtonComponent,
    LocationSearchModalComponent,
    WaitDriverComponent,
    ToggleSwitchComponent
  ],
  exports: [
    MapDistanceComponent,
    UserButtonComponent,
    MapDistanceComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class MapPageModule { }