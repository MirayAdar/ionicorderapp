import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GidService } from 'src/app/services/gid.service';
import { HttpService } from 'src/app/services/http.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage {

  constructor(
    gid: GidService, http: HttpService, localStorage: LocalStorageService, router: Router
  ) {
    console.log("ewewe");
    setTimeout(() => {
        let phone = localStorage.ReadFile("phone", "notfound");
        if (phone != "notfound") {
          http.GetWithoutToken("Auth/Auth/" + phone, tokenResponse => {
            if (tokenResponse.success) {
              gid.token = tokenResponse.data.token;
              http.Get("Users/" + phone, customerResponse => {
                console.log(customerResponse);
                if (customerResponse.success) {
                  gid.customer = customerResponse.data;
                  console.log(gid.customer);
                  gid.phone=customerResponse.data.telephone;
                  router.navigate(['/home/products']);
                }
                else {
                  gid.ShowToast(customerResponse.message, 2000);
                }
              });
            }
            else {
              gid.ShowToast(tokenResponse.message, 2000);
            }
          });
        }
        else {
          router.navigateByUrl('/login');
        }

    }, 3000);



  }
}
