import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { CategoryItemComponent } from './category-item/category-item.component';
import { BadgeComponent } from './badge/badge.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { ProductButtonComponent } from './product-button/product-button.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [InputComponent,CartItemComponent, ProductButtonComponent, BadgeComponent, ButtonComponent, IconButtonComponent, SearchbarComponent, CategoryItemComponent, ProductCardComponent],
  imports: [CommonModule, IonicModule],
  exports: [InputComponent, ProductButtonComponent, CartItemComponent, BadgeComponent, ButtonComponent, IconButtonComponent, SearchbarComponent, CategoryItemComponent, ProductCardComponent],
})

export class SharedModule { }
