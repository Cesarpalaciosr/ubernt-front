import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SavedPageRoutingModule } from './saved-routing.module';
import { SavedPage } from './saved.page';
import { StorageComponent } from 'src/app/components/storage/storage.component';
import { DriverChipComponent } from 'src/app/components/driver-chip/driver-chip.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavedPageRoutingModule
  ],
  declarations: [SavedPage, StorageComponent],
})
export class SavedPageModule { }