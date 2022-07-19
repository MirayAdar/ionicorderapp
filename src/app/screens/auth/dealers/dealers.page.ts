
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DealerModel } from 'src/app/models/dealer.model';
import { GidService } from 'src/app/services/gid.service';
import { HttpService } from 'src/app/services/http.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-dealers',
  templateUrl: './dealers.page.html',
  styleUrls: ['./dealers.page.scss'],
})
export class DealersPage implements OnInit {
  //   dealers =  [{
  //     bayiAdi: "Çetin Ticaret", bayiId: "21", address: "Yılmaz Mah. 647. Sk. Bornova/İzmir", phone: "0567 565 89 34", minPrice: 30, imgUrl: "", paymentTypes:"Nakit",IsOutOfService:false, NearestServiceTime:""
  //   },
  // {bayiAdi: "Çetin Ticaret", bayiId: "23", address: "Yılmaz Mah. 647. Sk. Bornova/İzmir", phone: "0567 565 89 34", minPrice: 30, imgUrl: "", paymentTypes:"Nakit", IsOutOfService:true, NearestServiceTime:"20.14.2022" }];

  buttonName: string;
  selectedDealerID: string = "";
  canSelect:boolean = false;
  dealers: DealerModel[];
  processType = "";//register-Yeni Hesap Oluşturma sırasında
  //addaddress-Yeni adres kaydı
  //updateaddress-Adres güncelleme
  neigborhoodId = "";
  updatedAddressId = "";
  constructor(route: ActivatedRoute,
    private router: Router,
    public gid: GidService,
    private http: HttpService,
    private localStorage: LocalStorageService) {
    this.processType = route.snapshot.paramMap.get('processType');
    this.neigborhoodId = route.snapshot.paramMap.get('neigborhoodId');
    this.updatedAddressId = route.snapshot.paramMap.get('updatedAddressId');
  }

  ngOnInit() {
    switch (this.processType) {
      case "register":
        this.buttonName = "Kayıt Ol"
        break;
      case "addaddress":
        this.buttonName = "Ekle"
        break;
      case "updateaddress":
        this.buttonName = "Güncelle"
        break;

    }

    this.http.Get("Addresses/neighborhoods/" + this.neigborhoodId + '/dealers', response => {
      if (response.success) {
        console.log(response);
        this.dealers = response.data;
        if (this.dealers.length > 0) {
          this.selectedDealerID = this.dealers[0].bayiId;
        }
      }
      else {
        this.gid.ShowToast(response.message, 2000);
      }
    })
  }

  selectDealer(id: string) {
    this.selectedDealerID = id;
  }


  clickSignUp() {
    let d = this.dealers.find(de => de.bayiId == this.selectedDealerID);
    if (d){
      if (this.processType == "register") {
        this.gid.customer.addresses[0].dealerName = d.bayiAdi;
        this.gid.customer.addresses[0].dealerAddress = d.address;
        this.gid.customer.addresses[0].dealerId = d.bayiId;
        this.gid.customer.addresses[0].dealerIsOutOfService = d.IsOutOfService;
        this.gid.customer.addresses[0].dealerMinAmount = d.minPrice;
        this.gid.customer.addresses[0].dealerNearestServiceTime = d.NearestServiceTime;
        this.gid.customer.addresses[0].dealerPaymentType = d.paymentTypes;
        this.gid.customer.addresses[0].dealerPhone = d.phone;
        this.http.Post("Users/Register", this.gid.customer, res => {
          if (res.success) {
            this.localStorage.WriteFile("phone", this.gid.phone);
            this.router.navigate(['/home/products']);
          }
          else{
            this.gid.ShowToast(res.message,2000);
          }
        })
      }
      else if (this.processType == "addaddress") {
        this.gid.customer.addresses[this.gid.customer.addresses.length - 1].dealerName = d.bayiAdi;
        this.gid.customer.addresses[this.gid.customer.addresses.length - 1].dealerAddress = d.address;
        this.gid.customer.addresses[this.gid.customer.addresses.length - 1].dealerId = d.bayiId;
        this.gid.customer.addresses[this.gid.customer.addresses.length - 1].dealerIsOutOfService = d.IsOutOfService;
        this.gid.customer.addresses[this.gid.customer.addresses.length - 1].dealerMinAmount = d.minPrice;
        this.gid.customer.addresses[this.gid.customer.addresses.length - 1].dealerNearestServiceTime = d.NearestServiceTime;
        this.gid.customer.addresses[this.gid.customer.addresses.length - 1].dealerPaymentType = d.paymentTypes;
        this.gid.customer.addresses[this.gid.customer.addresses.length - 1].dealerPhone = d.phone;
        this.http.Post("Users/Addresses/" + this.gid.customer.telephone, this.gid.customer.addresses[this.gid.customer.addresses.length - 1], res => {
          if (res.success) {
            this.gid.ShowToast("Adres eklendi.", 2000);
            this.router.navigate(['/home/addressdetail']);
          }
          else{
            this.gid.ShowToast(res.message,2000);
          }
        })
      }
      else{
        let address=this.gid.customer.addresses.find(a=>a.id==this.updatedAddressId);
        if (address){
          address.dealerName = d.bayiAdi;
          address.dealerAddress = d.address;
          address.dealerId = d.bayiId;
          address.dealerIsOutOfService = d.IsOutOfService;
          address.dealerMinAmount = d.minPrice;
          address.dealerNearestServiceTime = d.NearestServiceTime;
          address.dealerPaymentType = d.paymentTypes;
          address.dealerPhone = d.phone;
          this.http.Put("Users/Addresses/" + this.updatedAddressId + "/" + this.gid.customer.telephone, address,res => {
            if (res.success) {
              this.gid.ShowToast("Adres güncellendi.", 2000);
              this.router.navigate(['/home/addressdetail']);
            }
            else{
              this.gid.ShowToast(res.message,2000);
            }
          })
        }
      }
    }
    else{
      this.gid.ShowToast("Lütfen önce bayiyi seçiniz.", 2000);
    }
  }
}
