import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GidService } from '../services/gid.service';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss'],
})
export class NotificationModalComponent {
  @Input() imgBase64 : string;
  @Input() header: string;
  @Input() details: string;
  constructor(public gid : GidService, private modalCtrl: ModalController) { }

  closeNotifyModal() {
   this.modalCtrl.dismiss();
  }
}
