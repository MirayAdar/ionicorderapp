import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DealersPageRoutingModule } from './dealers-routing.module';

import { DealersPage } from './dealers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DealersPageRoutingModule
  ],
  declarations: [DealersPage]
})
export class DealersPageModule {}
