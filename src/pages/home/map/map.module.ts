import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MapPage } from './map.page';
import { MapPageRoutingModule } from 'src/routes/map-routing.module';

import { MapDistanceComponent } from 'src/components/map-distance/map-distance.component';
import { UserButtonComponent } from 'src/components/user-button/user-button.component'; 

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
    UserButtonComponent  
  ],
  exports: [
    MapDistanceComponent,
    UserButtonComponent  
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class MapPageModule { }