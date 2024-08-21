import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InfoCardUserComponent  } from "../../../components/atoms/info-card-user/info-card-user.component";
import { SavedPageRoutingModule } from '../../../routes/saved-routing.module';
import { SavedPage } from './saved.page';
import { StorageComponent } from 'src/app/components/molecules/storage/storage.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavedPageRoutingModule
  ],
  declarations: [SavedPage, StorageComponent, InfoCardUserComponent],
})
export class SavedPageModule { }