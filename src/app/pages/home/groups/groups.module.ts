import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GroupsPage } from './groups.page';
import { ChatModalComponent } from 'src/app/components/modals/chat-modal/chat-modal.component';

import { GroupsPageRoutingModule } from './groups-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, GroupsPageRoutingModule],
  declarations: [GroupsPage, ChatModalComponent],
})
export class GroupsPageModule {}
