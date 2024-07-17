import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MapPage } from './map.page';
import { MapPageRoutingModule } from 'src/routes/map-routing.module';
import { MapDistanceComponent } from 'src/services/map-distance.component';
import { SharedModule } from 'src/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapPageRoutingModule,
    SharedModule
  ],
  declarations: [
    MapPage,
    
  ],
  exports: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class MapPageModule { }