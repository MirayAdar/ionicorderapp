import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  id: number;
  product: Product;

  cartItems: Observable<CartItem[]>;
  cart = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private toastCtrl: ToastController
  ) {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.product = this.productService.getProduct(this.id);
    this.cartItems = this.cartService.getCart();
  }

  addItemToCart(id) {
    this.product = this.productService.getProduct(id);

    const tempCard = this.cartItems.subscribe(response => {
      this.cart = response
    })

    let added = false;
    for (let p of this.cart) {
      if (p.id === id) {
        p.quantity += 1;
        added = true;
        this.increaseQuantity();
        break;
      }
    }

    if (!added) {
      const cartitem: CartItem = {
        id: this.product.id,
        name: this.product.title,
        price: this.product.price,
        image: this.product.image,
        quantity: 1
      }

      this.cartService.addToCart(cartitem);
      this.presentToast();
    }
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: "Ürün sepetinize eklendi.",
      mode: 'ios',
      duration: 1000,
      position: 'top',
    })

    toast.present();
  }

  async increaseQuantity() {
    const toast = await this.toastCtrl.create({
      message: "Ürün adedi yükseltildi.",
      mode: 'ios',
      duration: 1000,
      position: 'top',
    })

    toast.present();
  }

}
