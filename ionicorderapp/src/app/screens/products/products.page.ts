import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item.model';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  categories: Category[] = [];
  products: Product[] = [];

  product: Product;
  cartItems: Observable<CartItem[]>;
  cart = [];

  term: any;
  

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.getCategories();
    this.products = this.productService.getProducts();
    this.cartItems = this.cartService.getCart();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.products = this.productService.getProducts();
      this.refreshPage();
      if (event) {
        event.target.complete();
      }
    }, 1000);
  }

  getCategories() {
    this.categories = [
      {
        id: 1,
        label: "Tüm Seçenekler",
        image: "https://www.buzdagisu.com.tr/Upload/Products/damacana19lt_urunlist.png",
        active: true
      },
      {
        id: 2,
        label: "Cam Damacana",
        image: "https://www.buzdagisu.com.tr/Upload/Products/damacana19lt_urunlist.png",
        active: false
      },
      {
        id: 3,
        label: "Normal Damacana",
        image: "https://www.buzdagisu.com.tr/Upload/Products/damacana19lt_urunlist.png",
        active: false
      }
    ]
  }

  goToDetailPage(id: number) {
    this.router.navigate(['home/detail', id]);
  }

  onIncrease(item: CartItem) {
    this.cartService.changeQty(1, item.id);
  }

  addItemToCart(id: number) {
    this.product = this.productService.getProduct(id);

    const tempCard = this.cartItems.subscribe(response => {
      this.cart = response
    })

    let added = false;
    for (let p of this.cart) {
      if (p.id === id) {
        p.quantity += 1;
        added = true;
        this.increaseQuantity(p);
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

      // localStorage.setItem("MY_CART", "31")

      this.cartService.addToCart(cartitem);
      this.presentToast();
    }

  }


  RemoveItemToCart(id: number) {
    const tempCard = this.cartService.getQtyProduct(id);

    for (let p of tempCard) {
      if (p.quantity === 1) this.removeFromCart(p);
      else this.decreaseQuantity(p);
    }

  }


  /************ Toast Messages Sections ************/

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: "Ürün sepetinize eklendi.",
      mode: 'ios',
      duration: 1000,
      position: 'top',
    })

    toast.present();
  }
  async refreshPage() {
    const toast = await this.toastCtrl.create({
      message: "Ürünler güncellendi.",
      mode: 'ios',
      duration: 1000,
      position: 'top',
    })

    toast.present();
  }

  async increaseQuantity(p) {
    const toast = await this.toastCtrl.create({
      message: `Ürün adedi yükseltildi.(${p.quantity})`,
      mode: 'ios',
      duration: 1000,
      position: 'top',
    })

    toast.present();
  }

  async decreaseQuantity(p) {
    this.cartService.changeQty(-1, p.id);
    const toast = await this.toastCtrl.create({
      message: `Ürün adedi düşürüldü.(${p.quantity})`,
      mode: 'ios',
      duration: 1000,
      position: 'top',
    })

    toast.present();
  }

  async removeFromCart(item: CartItem) {
    this.cartService.removeItem(item.id);

    const toast = await this.toastCtrl.create({
      message: "Ürün sepetten kaldırıldı.",
      mode: 'ios',
      duration: 1000,
      position: 'top',
    })

    toast.present();
  }

}
