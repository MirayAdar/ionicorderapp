import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonVirtualScroll } from '@ionic/angular';
import { ShoppingCartPageRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartPage } from './shopping-cart.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShoppingCartPageRoutingModule,
    SharedModule

  ],
  declarations: [ShoppingCartPage]
})
export class ShoppingCartPageModule {}
