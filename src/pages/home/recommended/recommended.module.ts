import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RecommendedPageRoutingModule } from 'src/routes/recommended-routing.module';
import { RecommendedPage } from './recommended.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecommendedPageRoutingModule
  ],
  declarations: [RecommendedPage],
})
export class RecommendedPageModule { }