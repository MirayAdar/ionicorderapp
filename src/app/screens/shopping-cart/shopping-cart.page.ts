import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, IonItemSliding, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { ProductOrder } from 'src/app/models/product-order.model';
import { CartService } from 'src/app/services/cart.service';
import { GidService } from 'src/app/services/gid.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {

  totalAmount$: Observable<number>;
  public items = this.cartService.items;
  selectedPayment: number;
  buttonName : string = "Öde";
  cartNote: string = "";
  @Output() increase = new EventEmitter();
  @Output() decrease = new EventEmitter();

  constructor(public cartService: CartService,
    private router: Router,
    private alertController: AlertController,
    private gid: GidService,
    private http: HttpService,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }


  changeGender(e: any){
    this.selectedPayment = parseInt(e.target.id);
    if(this.selectedPayment !== 3){
      this.buttonName = "Tamamla";
    }
    else{
      this.buttonName = "Öde";
    }
  }

  increaseQuantity(product) {
    this.cartService.addProduct(product);
  }

  decreaseQuantity(product) {
    this.cartService.decreaseProduct(product);
  }

  removeProduct(product) {
    this.alertController.create({
      message: 'Ürünü sepetten silmek istediğinize emin misiniz?',
      buttons: [
        {
          text: "Hayır", role: "cancel", handler: () => {
           //slidingItem.close();
          }
        },
        {
          text: "Evet", handler: () => {
            this.cartService.removeProduct(product);
          }
        }
      ]
    }).then(res => {
      res.present();
    })
    console.log(product);
  }

  clearCart() {
    this.alertController.create({
      message: 'Sepetinizi boşaltmak istediğinizden emin misiniz?',
      buttons: [
        {
          text: "Hayır", role: "cancel", handler: () => {
            console.log("cancel");
          }
        },
        {
          text: "Evet", handler: () => {
            this.cartService.clearCartItems();
          }
        }
      ]
    }).then(res => {
      res.present();
    })

  }

  completePayment(){
      console.log(this.cartService.items[0].product.quantity);
    if(this.cartService.total < this.gid.getCurrentAddress().dealerMinAmount){
      this.gid.ShowMessage(`Minimum sepet tutarının altındasınız. Devam edebilmek için ${this.gid.getCurrentAddress().dealerMinAmount - this.cartService.total}TL değerinde daha ürün eklemelisiniz.`);
    }
    else {
      if(this.selectedPayment == 1 || this.selectedPayment == 2){
      let productOrder: Array<ProductOrder> = new Array<ProductOrder>();
      for (var i=0; i<this.cartService.items.length; i++){
        productOrder.push(new ProductOrder(
          this.cartService.items[i].product.productId,
          this.cartService.items[i].product.quantity,
          this.cartService.items[i].product.fiyat
        ));
      }
        let order = new Order (
        this.gid.getCurrentAddress().id,
        productOrder,
        this.cartService.total,
        this.selectedPayment,
        this.cartNote
      );

      this.http.Post("Orders/" + this.gid.customer.telephone, order , res => {
        if (res.success) {
          console.log(res);
          this.gid.order = order;
          for (var i=0; i< this.cartService.items.length; i++){
            this.gid.order.products[i].imgBase64 = this.cartService.items[i].product.imgBase64;
            this.gid.order.products[i].productNames = this.gid.products.find(p => p.productId == this.gid.order.products[i].productId).bayiUrunTanim;
          }

            console.log(this.gid.order);
          this.gid.ShowLoading("Sipariş Oluşturuluyor", 1500, true);
          setTimeout(() => {
            this.router.navigateByUrl('/home/completed-order/0');
            this.cartService.clearCartItems();
            this.cartNote = "";
          }, 1500);
        }
      })
     }
     else{
       // IYZICO ENTEGRASYONU
     }
    }
  }

}
