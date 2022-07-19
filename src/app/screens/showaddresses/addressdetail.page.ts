import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { GidService } from 'src/app/services/gid.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-addressdetail',
  templateUrl: './addressdetail.page.html',
  styleUrls: ['./addressdetail.page.scss'],
})
export class AddressdetailPage implements OnInit {

  //userId = this.gid.userId;

  constructor(public gid: GidService,
    private httpService: HttpService,
    private alertCtrl: AlertController,
    private router: Router) {

  }

  ngOnInit() {
    console.log(this.gid.customer.addresses);
    // this.httpService.Get("Users/Addresses/" + this.customer.userID).subscribe(response => {
    //   this.gid.customer.addresses = response.data;
    //   console.log(this.gid.address)
    //})
  }

  deleteAddress(id) {
    this.alertCtrl.create({
      message: 'Adresi silmek istediğinize emin misiniz?',
      buttons: [
        {
          text: "Hayır", role: "cancel", handler: () => {
          }
        },
        {
          text: "Evet", handler: () => {
            this.httpService.Delete("Users/Addresses/" + id + "/" + this.gid.customer.telephone, response => {
              if (response.success){
                this.gid.customer.addresses.forEach((a, i)=>{
                  if (a.id==id){
                    this.gid.customer.addresses.splice(i,1);
                  }
                });
              }
              else{
                this.gid.ShowToast(response.message, 2000);
              }
            });
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present()
    });

  }

  editAddress(id) {
    this.router.navigate(['/signup/updateaddress/' +id]);
  }

  addAddress() {
    this.router.navigateByUrl('/signup/addaddress/');
  }
}
