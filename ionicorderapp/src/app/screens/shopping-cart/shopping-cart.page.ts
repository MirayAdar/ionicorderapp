import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {
  cartItems$: Observable<CartItem[]>;
  totalAmount$: Observable<number>;
  
  @Output() increase = new EventEmitter();
  @Output() decrease = new EventEmitter();

  constructor(private cartService: CartService, private router: Router, private alertCtrl: ToastController) { }

  ngOnInit() {
    this.cartItems$ = this.cartService.getCart();
    this.totalAmount$ = this.cartService.getTotalAmount();
  }

  onIncrease(item: CartItem) {
    this.cartService.changeQty(1, item.id);
  }

  onDecrease(item: CartItem) {
    if(item.quantity === 1) this.removeFromCart(item);
    else this.cartService.changeQty(-1, item.id);
  }


  async removeFromCart(item: CartItem) {
    const alert = await this.alertCtrl.create({
      message: "Ürünü sepetten kaldırmak istediğine emin misin?",
      buttons: [
        {
          text: "Evet",
          handler: () => this.cartService.removeItem(item.id)
        }, 
        {
          text: "Hayır"
        }
      ]
    });
    alert.present();
  }
}
