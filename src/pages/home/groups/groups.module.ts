// src/app/groups/groups.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GroupsPageRoutingModule } from 'src/routes/groups-routing.module';
import { ChatModalComponent } from 'src/components/chat-modal/chat-modal.component';
import { GroupsPage } from './groups.page';  
import { SharedModule } from 'src/components/shared/shared.module';

@NgModule({
  declarations: [
    ChatModalComponent,
    GroupsPage,  
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GroupsPageRoutingModule,
  ],

})
export class GroupsModule {}