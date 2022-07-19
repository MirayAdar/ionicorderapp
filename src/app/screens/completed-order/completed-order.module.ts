import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompletedOrderPageRoutingModule } from './completed-order-routing.module';

import { CompletedOrderPage } from './completed-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompletedOrderPageRoutingModule
  ],
  declarations: [CompletedOrderPage]
})
export class CompletedOrderPageModule {}
