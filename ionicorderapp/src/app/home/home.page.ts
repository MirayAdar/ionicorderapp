import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  carts: any;
  constructor(public cartService: CartService) { }

  ngOnInit() {
    this.carts = this.cartService.getCart()
  }

}
