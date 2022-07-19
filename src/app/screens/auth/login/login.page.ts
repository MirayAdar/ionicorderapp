import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GidService } from 'src/app/services/gid.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user: any;
  focused: boolean;
  rules: any;
  phonePattern: any = /^[02-9]\d{9}$/;
  acceptKvkk = false;
  submitted = false;

  constructor(private http: HttpService, private router: Router, public gid: GidService, private alertController: AlertController) {

    this.rules = { X: /[5]/ };
   }

   loginForm = new FormGroup({
    phone: new FormControl('', Validators.compose([ Validators.required, Validators.minLength(10),]))
   });


  openPopup($event: any) {
    this.alertController.create({
      header: 'Kabul ediyor musun?',
      subHeader: 'Hizmet Şartları Metni',
      message: "Sevgili ziyaretçimiz, lütfen https://site.com web sitemizi ziyaret etmeden önce işbu kullanım koşulları sözleşmesini dikkatlice okuyunuz. Siteye erişiminiz tamamen bu sözleşmeyi kabulünüze ve bu sözleşme ile belirlenen şartlara uymanıza bağlıdır. Şayet bu sözleşmede yazan herhangi bir koşulu kabul etmiyorsanız, lütfen siteye erişiminizi sonlandırınız. Siteye erişiminizi sürdürdüğünüz takdirde, koşulsuz ve kısıtlamasız olarak, işbu sözleşme metninin tamamını kabul ettiğinizin, tarafımızca varsayılacağını lütfen unutmayınız. https://site.com web sitesi Şirket Adı tarafından yönetilmekte olup, bundan sonra SİTE olarak anılacaktır. İşbu siteye ilişkin Kullanım Koşulları, yayınlanmakla yürürlüğe girer. Değişiklik yapma hakkı, tek taraflı olarak SİTE'ye aittir ve SİTE üzerinden güncel olarak paylaşılacak olan bu değişiklikleri, tüm kullanıcılarımız baştan kabul etmiş sayılır.",
      buttons: [
        {
          text: 'Kabul Etmiyorum.',
          handler: () => {
            $event.target.classList.remove('checkbox-checked');
            this.acceptKvkk = false;
          }
        },
        {
          text: 'Kabul Ediyorum.',
          handler: () => {
            $event.target.classList.add('checkbox-checked');
            this.acceptKvkk = true;
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }


  sendSmsVerification(){
    this.submitted=true;
    //console.log(this.loginForm.value.phone);
    if(this.loginForm.valid){
    this.gid.phone = this.loginForm.value.phone;
    console.log(this.gid.phone);
    this.http.GetWithoutToken("Auth/GetCode?phoneNumber=" + this.gid.phone, res => {
      console.log(res);
      if (res.success){
        this.router.navigateByUrl('/sms-verification');
      }
      else{
        //this.router.navigateByUrl('/sms-verification');
        this.gid.ShowToast(res.message, 2000);
      }
    });
  }
}


}
