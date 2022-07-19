import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/models/cartItem.model';
import { Order } from 'src/app/models/order.model';
import { ProductOrder } from 'src/app/models/product-order.model';
import { GidService } from 'src/app/services/gid.service';
import { HttpService } from 'src/app/services/http.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-completed-order',
  templateUrl: './completed-order.page.html',
  styleUrls: ['./completed-order.page.scss'],
})
export class CompletedOrderPage implements OnInit {

  foOrder : Order[] = [];
  foOrderProduct: Array<ProductOrder>;
  isFavOrder: string;

  constructor(public gid: GidService, private router: Router, private http: HttpService, private localStorage: LocalStorageService, private route: ActivatedRoute) {
    this.isFavOrder = route.snapshot.paramMap.get('id');
   }
  ngOnInit() {
    console.log(this.gid.order);
  }
  backToHome(){
    this.router.navigateByUrl("/home/products");
    this.gid.tempOrder = [];
  }

  saveFavOrder(){
    this.foOrderProduct = new Array<ProductOrder>();
    for(var i=0; i<this.gid.order.products.length; i++){
      this.foOrderProduct.push(new ProductOrder(
        this.gid.order.products[i].productId,
        this.gid.order.products[i].quantity,
        this.gid.order.products[i].priceAmount,
        this.gid.order.products[i].productNames,
        this.gid.order.products[i].imgBase64
      ));
    }
    console.log(this.foOrder);
    console.log(this.foOrderProduct);
     this.foOrder.push(new Order(
      this.gid.getCurrentAddress().id,
      this.foOrderProduct,
      this.gid.order.priceAmount,
      this.gid.order.paymentType,
      this.gid.order.note

    ));
    //this.gid.getCurrentAddress().foOrder = JSON.stringify(this.foOrder);
    // let address = this.gid.getCurrentAddress();
    // if(address){
    //   address.foOrder= JSON.stringify(this.gid.foOrder);
    // }
    // console.log(this.gid.getCurrentAddress().foOrder);
    // this.http.Put("Users/Addresses/" + this.gid.getCurrentAddress().id + "/" + this.gid.customer.telephone, address,res => {
    //   if (res.success) {
        // this.gid.ShowToast("Favori sipariş olarak kaydedildi", 2000);
        // this.gid.foOrder[0].note = this.gid.order.note;
        // this.gid.foOrder[0].paymentType = this.gid.order.paymentType;
        // this.gid.foOrder[0].priceAmount = this.gid.order.priceAmount;
        // for (var i = 0; i<this.gid.foOrder[0].products.length; i++){
        //     this.gid.foOrder[0].products[i].productNames = this.gid.products.find(p => p.productId == this.gid.foOrder[0].products[i].productId).bayiUrunTanim;
        //     this.gid.foOrder[0].products[i].priceAmount = this.gid.order.products[i].priceAmount;
        //   }
        // console.log(this.gid.foOrder[0]);
        //JSON.stringify(this.gid.foOrder[0]);
        this.localStorage.WriteFile("foOrder", JSON.stringify(this.foOrder[0]));
        console.log(this.foOrder[0]);
        setTimeout(() => {
          this.router.navigateByUrl("/home/products");
          //this.gid.tempOrder = [];
        }, 2000);
    //   }
    //   else{
    //     this.gid.ShowToast(res.message,2000);
    //   }
    // })
    }


}
