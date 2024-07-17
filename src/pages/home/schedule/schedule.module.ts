import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SchedulePageRoutingModule } from 'src/routes/schedule-routing.module';
import { SchedulePage } from './schedule.page';
import { UserButtonComponent } from 'src/components/atoms/user-button/user-button.component';
import { SharedModule } from 'src/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulePageRoutingModule,
    SharedModule
  ],
  declarations: [SchedulePage],
  // exports: [UserButtonComponent]
})
export class SchedulePageModule { }