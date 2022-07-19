import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateAdressPageRoutingModule } from './create-adress-routing.module';

import { CreateAdressPage } from './create-adress.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateAdressPageRoutingModule,
    SharedModule
  ],
  declarations: [CreateAdressPage]
})
export class CreateAdressPageModule {}
