import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Products } from 'src/app/models/products.model';
import { CartService } from 'src/app/services/cart.service';
import { GidService } from 'src/app/services/gid.service';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage {
  id: any;
  product: Products;
  cart = [];


  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private gid: GidService,
    private httpService: HttpService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }
  ionViewDidEnter(){
    this.httpService.Get(
      'Products/Info/' + this.id,
      (response) => {
        if (response.success) {
          this.product = response.data;
          this.product.quantity = 0;
          console.log(this.product)
        } else {
          this.gid.ShowToast(response.message, 2000);
        }
      }
    );
  }
  addItemToCart() {
    this.cartService.addProduct(this.product);
    this.gid.ShowToast("Ürün adedi yükseltildi", 1500);
   }



}
