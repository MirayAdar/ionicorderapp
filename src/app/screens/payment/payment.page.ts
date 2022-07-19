import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
//import { CartItem } from 'src/app/models/cart-item.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  //cartItems$: Observable<CartItem[]>;
  totalAmount$: Observable<number>;
  
  constructor(private cartService: CartService) { }

  ngOnInit() {
    // this.cartItems$ = this.cartService.getCart();
    // this.totalAmount$ = this.cartService.getTotalAmount();
  }

}
