import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Order } from 'src/app/models/order.model';
import { GidService } from 'src/app/services/gid.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-last-orders',
  templateUrl: './last-orders.page.html',
  styleUrls: ['./last-orders.page.scss'],
})
export class LastOrdersPage {

  lastOrders: any[] = [];

  constructor(public gid: GidService, private httpService : HttpService, private alertController: AlertController, private router: Router) {}

 ionViewDidEnter() {

  this.httpService.Get(
    'Orders/' + this.gid.customer.customerId,
    (response) => {
      if (response.success) {
        console.log(response.data);
        this.lastOrders = response.data;
        for(var i=0; i<response.data.length; i++){
         this.lastOrders[i].cstDbName = this.gid.customer.addresses.find(a => a.id == response.data[i].cstAddressId).dealerName;
        // this.lastOrders[i].productNames = this.gid.products.find(a => a.productId == response.data[i].products).bayiUrunTanim
         this.lastOrders[i].cstProduct = this.gid.products.find(p => p.productId == response.data[i].cstProduct).bayiUrunTanim;
        console.log(this.lastOrders[i].cstProduct);
       }
        console.log(this.lastOrders);

      } else {
        this.gid.ShowToast(response.message, 2000);
      }
    }
  );
}
 cancelOrder(id: string){
  this.alertController.create({
    message: 'Siparişinizi iptal etmek istediğinizden emin misiniz?',
    buttons: [
      {
        text: "Hayır", role: "cancel"
      },
      {
        text: "Evet", handler: () => {
          let canceledOrder = new Order(
            "",
            [],
            0,
            3,
            "",
            "",
            4,
            id
            );
            this.httpService.Put('Orders/' + this.gid.customer.telephone + '/'+ id, canceledOrder, res => {
              if (res.success) {
                this.gid.ShowToast("Siparişiniz iptal edildi, anasayfaya yönlendiriliyorsunuz..",1500)
                setTimeout(() =>{
                  this.router.navigate(['/home/products']);
                 },1500);


              }
              else{
                this.gid.ShowToast(res.message,2000);
              }
            })
        }
      }
    ]
  }).then(res => {
    res.present();
  })


}

}



