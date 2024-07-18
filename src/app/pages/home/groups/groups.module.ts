// src/app/groups/groups.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GroupsPageRoutingModule } from 'src/app/routes/groups-routing.module';
import { ChatModalComponent } from 'src/app/components/organisms/chat-modal/chat-modal.component';
import { GroupsPage } from './groups.page';

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