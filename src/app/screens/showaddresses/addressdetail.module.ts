import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddressdetailPageRoutingModule } from './addressdetail-routing.module';
import { AddressdetailPage } from './addressdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddressdetailPageRoutingModule
  ],
  declarations: [AddressdetailPage]
})
export class AddressdetailPageModule {}
