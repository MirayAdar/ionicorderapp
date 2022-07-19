import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { GidService } from 'src/app/services/gid.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {


  constructor(
    public gid: GidService,
    private httpService: HttpService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.editProfileForm.get('name').setValue(this.gid.customer.name);
    this.editProfileForm.get('surname').setValue(this.gid.customer.surname);
  }

  editProfileForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
  });

  updateProfile() {
    if (this.editProfileForm.valid) {
     if (
      this.editProfileForm.value.name != this.gid.customer.name ||
      this.editProfileForm.value.surname != this.gid.customer.surname
    ) {
      this.httpService.Put(
        'Users/' + this.gid.customer.customerId + '/' + this.gid.phone,
        this.editProfileForm.value,
        (res) => {
          console.log(res);
          this.gid.customer.name = this.editProfileForm.value.name;
          this.gid.customer.surname = this.editProfileForm.value.surname;
        }
      );
      this.ShowToast();

    }
   }
   else{
     this.gid.ShowMessage("Lütfen gerekli tüm alanları doldurun.");
   }
  }

  async ShowToast() {
    const toast = await this.toastCtrl.create({
      message: 'Bilgileriniz güncellendi',
      mode: 'ios',
      duration: 2000,
      position: 'top',
    });

    toast.present();
  }
}
