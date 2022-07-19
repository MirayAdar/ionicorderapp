import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Capacitor } from '@capacitor/core';
import {
  
  PushNotifications,
  PushNotificationSchema,
  ActionPerformed,
  Token
  
} from '@capacitor/push-notifications';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  carts: any;
  cartItemCount: BehaviorSubject<number>;
  constructor(public cartService: CartService) { }

  ngOnInit() {
    this.carts = this.cartService.getCart();
    this.cartItemCount = this.cartService.cartItemCount;
    console.log(this.cartItemCount);
  }
  initPush() {
    if (Capacitor.getPlatform() !== 'web') {
      this.registerPush();
    }
  }
  
  private registerPush() {
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // No permission for push granted
      }
    });
 
    PushNotifications.addListener(
      'registration',
      (token: Token) => {
        alert('Push registration success, token: ' + token.value);
      }
    );
 
    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error: ' + JSON.stringify(error));
    });
 
    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );
 
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: ActionPerformed) => {
        alert('Push received: ' + JSON.stringify(notification));
          
      }
    );
  }
}
