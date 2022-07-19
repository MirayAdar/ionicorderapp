import { Injectable } from '@angular/core';
import * as pako from "pako";
import { AlertController, LoadingController, ToastController } from '@ionic/angular'
import { CustomerModel } from '../models/customer.model';
import { AddressModel } from '../models/address.model';
import { Products } from '../models/products.model';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class GidService {
  appName="İzmir Su";
  customer: CustomerModel;
  phone:string;
  order: Order;
  token: string="";
  products: Products[] = [];
  tempOrder:Products[] = [];
  constructor(public alertCtrl: AlertController, private toastCtrl: ToastController, private loadingCtrl: LoadingController) { }

  getCurrentAddress():AddressModel{
    let selectedAdresses=this.customer.addresses.filter(a=>a.isSelected);
    if (selectedAdresses && selectedAdresses.length>0)
    {
      return selectedAdresses[0];
    }
    else{
      this.customer.addresses[0].isSelected = true;
      return this.customer.addresses[0];
    }
  }
  getNotCurrentAddresses(): AddressModel[] {
    return this.customer.addresses.filter(a => a.isSelected == false);
  }
  FormatString(str: string, args: string[]): string {
    return str.replace(/{(\d+)}/g, function (match: string, number: number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  }

  ConvertFromBase64String(text: string): Array<number> {
    let byteCharacters = atob(text);
    let byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    return byteNumbers;
  }

  ConvertToBase64String(buffer: number[]): string {
    let retval = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      retval += String.fromCharCode(bytes[i]);
    }
    return window.btoa(retval);
  }

  Compress(text: string): number[] {
    return Array.from(pako.deflate(text)) as number[];
  }

  DeCompress(bytes: number[]): string {
    return this.Utf8ArrayToStr(pako.inflate(bytes));
  }

  Utf8ArrayToStr(array: Uint8Array): string {
    let char2: any;
    let char3: any;
    let out = "";
    let len = array.length;
    let i = 0;
    while (i < len) {
      let c = array[i++];
      switch (c >> 4) {
        case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
          // 0xxxxxxx
          out += String.fromCharCode(c);
          break;
        case 12: case 13:
          // 110x xxxx   10xx xxxx
          char2 = array[i++];
          out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
          break;
        case 14:
          // 1110 xxxx  10xx xxxx  10xx xxxx
          char2 = array[i++];
          char3 = array[i++];
          out += String.fromCharCode(((c & 0x0F) << 12) |
            ((char2 & 0x3F) << 6) |
            ((char3 & 0x3F) << 0));
          break;
      }
    }

    return out;
  }

  async ShowMessage(M: string, T: string = "Uyarı", callback: () => void = null) {
    let alert = await this.alertCtrl.create({
      header: T,
      message: M,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Tamam',
          handler: () => {
            if (callback != null) {
              callback();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async ShowToast(M: string, duration: number) {
    const toast = await this.toastCtrl.create({
      message: M,
      mode: 'ios',
      duration: duration,
      position: 'middle',
    })

    toast.present();
  }

  async ShowLoading(M:string, duration: number, backdropDismiss: boolean){
    const load = await this.loadingCtrl.create({
      message: M,
      duration: duration,
      backdropDismiss: true,
    })
     load.present();
     setTimeout(() => {
       load.dismiss();
     }, 2000)
  }

  EmptyGuid(){
    return "00000000-0000-0000-0000-000000000000";
  }
  MakeNewGuid (): string {

    let result : string ;

    let i : string ;

    let j : number ;



    result = '' ;

    for ( j = 0 ; j < 32 ; j ++) {

      if ( j == 8 || j == 12 || j == 16 || j == 20 ) result = result + '-' ;

      i = Math . floor ( Math . random () * 16 ). toString ( 16 );

      result = result + i ;

    }

    return result ;

  }

}
