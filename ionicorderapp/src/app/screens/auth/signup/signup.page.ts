import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  constructor(public toastCtrl: ToastController, private alertController: AlertController) { }

  @Input() label: string;
  @Input() length: '11';
  @Input() name: string;
  @Input() type = 'text'; // set default type be text

  focused: boolean;

  binding: string;

  onBlur(event: any) {
    const value = event.target.value;

    if (!value) {
      this.focused = false;
    }
  }


  ngOnInit() {
  }


  signupForm = new FormGroup({
    nameSurname: new FormControl('', [Validators.required, Validators.minLength(5)]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl(''),
  })

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
          }
        },
        {
          text: 'Kabul Ediyorum.',
          handler: () => {
            $event.target.classList.add('checkbox-checked');
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  async openToast() {
    const toast = await this.toastCtrl.create({
      message: 'Başarıyla Kayıt Oldunuz!',
      duration: 1000
    });
    toast.present();
  }
}
