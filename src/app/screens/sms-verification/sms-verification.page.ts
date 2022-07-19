import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GidService } from 'src/app/services/gid.service';
import { HttpService } from 'src/app/services/http.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-sms-verification',
  templateUrl: './sms-verification.page.html',
  styleUrls: ['./sms-verification.page.scss'],
})
export class SmsVerificationPage  {
  @ViewChild('otp1') input;
  otpString: string[] = ['', '', '', ''];

  constructor(
    public router: Router,
    public http: HttpService,
    private gid: GidService,
    private localStorage: LocalStorageService
  ) { }


  ionViewDidEnter() {
    setTimeout(() => {
      this.input.setFocus();
    }, 500);
  }

  keyup(next) {
    next.setFocus();
  }


  Validate() {
    let otpData = this.otpString.join('');
    console.log(this.otpString);
    console.log(otpData.length);
    if (otpData.length == 4) {
      this.http.GetWithoutToken("Auth/VerifyCode?phoneNumber=" + this.gid.phone + "&smscode=" + otpData, res => {
        console.log(res);
        if (res.success) {
          this.gid.token = res.data.token;
          if (res.data.statu == "unregistered") {
            this.router.navigateByUrl("/signup/register/1" );
          }
          else {
            this.localStorage.WriteFile("phone", this.gid.phone);
            this.http.Get("Users/" + this.gid.phone, resCustomer => {
              if (resCustomer.success) {
                this.gid.customer = resCustomer.data;
                console.log(this.gid.customer);
                this.router.navigateByUrl("/home/products");
              }
              else {
                this.gid.ShowToast(res.message, 2000);
              }
            });
          }
        }
        else {
          this.gid.ShowToast(res.message, 2000);
        }
      });
    }
    else {
      this.gid.ShowToast("Lütfen önce SMS kodunu giriniz.", 2000);
    }

  }
  sendSmsAgain(){
    this.http.GetWithoutToken("Auth/GetCode?phoneNumber=" + this.gid.phone, res => {
      if (!res.success){
        this.gid.ShowToast(res.message, 2000);
      }
    });
  }
}
