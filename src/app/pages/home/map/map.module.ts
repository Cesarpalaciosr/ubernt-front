import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MapPage } from './map.page';
import { MapPageRoutingModule } from './map-routing.module';

import { MapDistanceComponent } from 'src/app/components/mapscomponent/map-distance/map-distance.component';
import { UserButtonComponent } from 'src/app/components/buttons/user-button/user-button.component'; 
import { LocationSearchModalComponent } from 'src/app/components/location-search-modal/location-search-modal.component';
import { WaitDriverComponent } from 'src/app/components/modals/wait-driver/wait-driver.component';
import { ToggleSwitchComponent } from 'src/app/components/buttons/toggle-switch/toggle-switch.component';
import { MapDriverDistanceComponent } from 'src/app/components/mapscomponent/map-driver-distance/map-driver-distance.component';
import { RendermapComponent } from 'src/app/components/mapscomponent/rendermap/rendermap.component';
import { AcceptTripModalComponent } from 'src/app/components/modals/accept-trip-modal/accept-trip-modal.component';
import { DriverChipComponent } from 'src/app/components/driver-chip/driver-chip.component';
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
    DriverChipComponent,
    AcceptTripModalComponent,
    ToggleSwitchComponent,
    MapDriverDistanceComponent,
    RendermapComponent
  ],
  exports: [
    MapDistanceComponent,
    UserButtonComponent,
    MapDistanceComponent,
    MapDriverDistanceComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class MapPageModule { }