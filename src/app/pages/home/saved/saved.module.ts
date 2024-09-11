import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SavedPageRoutingModule } from './saved-routing.module';
import { SavedPage } from './saved.page';
import { StorageComponent } from 'src/app/components/storage/storage.component';
import { DriverChipComponent } from 'src/app/components/driver-chip/driver-chip.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SavedPageRoutingModule
  ],
  declarations: [SavedPage,/* DriverChipComponent, */StorageComponent],
})
export class SavedPageModule { }