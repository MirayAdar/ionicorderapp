import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyaddressPageRoutingModule } from './myaddress-routing.module';

import { MyaddressPage } from './myaddress.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyaddressPageRoutingModule,
    SharedModule
  ],
  declarations: [MyaddressPage]
})
export class MyaddressPageModule {}
