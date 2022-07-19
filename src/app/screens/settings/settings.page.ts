import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GidService } from 'src/app/services/gid.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  constructor( public gid: GidService,public router: Router) { }

  editProfileInfo(){
    this.router.navigateByUrl('/home/edit-profile')
  }

  editAddressInfo(){
    this.router.navigateByUrl('/home/addressdetail')
  }

}
