import {
  AfterContentChecked,
  Component,
  OnInit
} from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  AlertController,
  IonRouterOutlet,
  LoadingController,
  ModalController,
  ToastController,
  ViewWillEnter,
} from '@ionic/angular';
import SwiperCore, {
  Autoplay,
  Navigation,
  Pagination,
  SwiperOptions,
} from 'swiper';
import { GidService } from 'src/app/services/gid.service';
import { HttpService } from 'src/app/services/http.service';
import { NotificationModalComponent } from 'src/app/notification-modal/notification-modal.component';
import { Products } from 'src/app/models/products.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressModel } from 'src/app/models/address.model';
import { Order } from 'src/app/models/order.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';

SwiperCore.use([Autoplay, Pagination, Navigation]);
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit, AfterContentChecked {
  sliders: any[] = [];
  bannerConfig: SwiperOptions;
  activeAddress: any;
  notifications: Notification[];
  isOpen: boolean = false;
  lastOrders: any[];
  favoriteorder: Order;
  showFavOrder: boolean = false;
  products: Products[] = [];
  cartItemCount: BehaviorSubject<number>;
  cartItems = this.cartService.items;
  notActiveAddresses: AddressModel[];
  diffMs:any;


  constructor(
    private router: Router,
    public cartService: CartService,
    private alertCtrl: AlertController,
    public gid: GidService,
    private httpService: HttpService,
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet,
    private loadingCtrl: LoadingController,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit() {
    this.activeAddress = this.gid.getCurrentAddress();
    this.notActiveAddresses = this.gid.getNotCurrentAddresses();
    this.sliders = [
      {
        notificationId: 0,
        imgBase64: 'assets/imgs/campaign1.jpg',
        header: 'İlk Siparişinize Özel',
        details:
          'Uygulamadan ilk defa sipariş verecek müşterileerimize özel ilk siparişe 10% indirim. 30.06.2022 tarihine kadar geçerlidir. ',
      },
      {
        notificationId: 1,
        imgBase64: 'assets/imgs/campaign2.jpg',
        header: 'İlk Siparişinize Özel',
        details:
          'Uygulamadan ilk defa sipariş verecek müşterileerimize özel ilk siparişe 10% indirim. 30.06.2022 tarihine kadar geçerlidir. ',
      },
      {
        notificationId: 2,
        imgBase64: 'assets/imgs/campaign3.png',
        header: 'İlk Siparişinize Özel',
        details:
          'Uygulamadan ilk defa sipariş verecek müşterileerimize özel ilk siparişe 10% indirim. 30.06.2022 tarihine kadar geçerlidir. ',
      },
    ];

    /*******************PRODUCTS****************************/

    this.httpService.Get(
      'Products/' + this.gid.getCurrentAddress().dealerId,
      (response) => {
        console.log(response);
        if (response.success) {
          this.gid.products = response.data;
          this.gid.products.forEach((p) => (p.quantity = 0));
        } else {
          this.gid.ShowToast(response.message, 2000);
        }
      }
    );

    /***************** NOTIFICATIONS**************************/

    this.httpService.Get(
      'Notifications/' + this.gid.getCurrentAddress().dealerId,
      (response) => {
        console.log(response);
        if (response.success) {
          this.notifications = response.data;
          console.log(this.notifications);
        } else {
          this.gid.ShowToast(response.message, 2000);
        }
      }
    );

    /* Products*/
    // this.products = this.cartService.getProducts();
    this.cartItemCount = this.cartService.cartItemCount;
  }
  ionViewDidEnter() {
    this.httpService.Get(
      'Orders/' + this.gid.customer.customerId,
      (response) => {
        if (response.success) {
          console.log(response.data);
          if (response.data.length != 0) {
            this.lastOrders = response.data;
            for (var i = 0; i < response.data.length; i++) {
              this.lastOrders[i].cstDbName = this.gid.customer.addresses.find(
                (a) => a.id == response.data[i].cstAddressId
              ).dealerName;
            }
            // let currentDate: any = new Date();
            // let orderDate : any = new Date(this.lastOrders[0].cstCreateDate);
            // let difference = currentDate.getTime() - orderDate.getTime();
            // this.diffMs = Math.floor((difference /1000) /60);
          }
        } else {
          this.gid.ShowToast(response.message, 2000);
        }
      }
    );
    let favOrder = this.localStorage.ReadFile('foOrder', 'notfound');
    if (favOrder!="notfound"){
      this.favoriteorder = JSON.parse(favOrder);
    }
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ionViewDidEnter();
      if (event) {
        event.target.complete();
      }
    }, 1000);
  }
  openFavOrder() {
    this.showFavOrder = !this.showFavOrder;
  }

  createFavOrder() {
    let total = 0;
    this.favoriteorder.products.forEach((p) => {
      total += p.priceAmount * p.quantity;
    });
    let paymentTypeName: string;
    switch (this.favoriteorder.paymentType) {
      case 0:
        paymentTypeName = "Kapıda Nakit"
        break;
      case 1:
        paymentTypeName = "Kapıda Kredi Kartı"
        break;
      case 2:
        paymentTypeName = "Kredi Kartı ile"
        break;
    }
    if (this.gid.getCurrentAddress().dealerMinAmount <= total) {
      this.alertCtrl
        .create({
          message: `Toplam tutar ${total} TL'dir ve ödemeniz ${paymentTypeName} ödeme türünde yapılacaktır. Siparişi onaylıyor musunuz?`,
          buttons: [
            {
              text: 'Hayır',
              role: 'cancel',
              handler: () => {},
            },
            {
              text: 'Evet',
              handler: () => {
                this.httpService.Post(
                  'Orders/' + this.gid.customer.telephone,
                  this.favoriteorder,
                  (res) => {
                    if (res.success) {
                      console.log(res);
                      this.gid.ShowLoading('Sipariş Oluşturuluyor', 1500, true);
                      setTimeout(() => {
                        this.router.navigateByUrl('/home/completed-order/1');
                      }, 1500);
                    } else {
                      this.gid.ShowToast(res.message, 2000);
                    }
                  }
                );
              },
            },
          ],
        })
        .then((res) => {
          res.present();
        });
    } else {
      this.gid.ShowMessage(
        `Seçili bayinizin minimum tutarı değişmiştir. Siparişe devam edebilmek için ${
          this.gid.getCurrentAddress().dealerMinAmount - total
        } TL değerinde ürün ekleyin.`
      );
    }
  }

  ngAfterContentChecked() {
    this.bannerConfig = {
      slidesPerView: 1.2,
      centeredSlides: true,
      initialSlide: 1,
      spaceBetween: 15,
      autoplay: {
        delay: 3000,
      },
      pagination: { clickable: true },
      navigation: true,
    };
  }

  // nextSlide(){
  //   this.swiper.swiperRef.slideNext(100);
  // }
  // previousSlide(){
  //   this.swiper.swiperRef.slidePrev(100);
  // }

  async openNotifyModal(data) {
    console.log(data);
    const modal = await this.modalCtrl.create({
      component: NotificationModalComponent,
      componentProps: {
        imgBase64: data.imgBase64,
        header: data.header,
        details: data.details,
      },
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      //  presentingElement: await this.modalCtrl.getTop()
    });

    await modal.present();
  }

  showAddresses() {
    this.isOpen = !this.isOpen;
    console.log(this.gid.customer);
  }

  changeActiveAddress(addressId) {
    this.gid.customer.addresses.forEach((a) => (a.isSelected = false));
    this.gid.customer.addresses.find((a) => a.id == addressId).isSelected =
      true;
    this.activeAddress = this.gid.getCurrentAddress();
    this.notActiveAddresses = this.gid.getNotCurrentAddresses();
    this.loadingCtrl
      .create({ message: 'Ürünler yükleniyor' })
      .then((loading) => {
        loading.present();
        setTimeout(() => {
          this.httpService.Get(
            'Products/' + this.gid.getCurrentAddress().dealerId,
            (response) => {
              console.log(response);
              if (response.success) {
                this.gid.products = response.data;
                this.gid.products.forEach((p) => (p.quantity = 0));
              } else {
                this.gid.ShowToast(response.message, 2000);
              }
            }
          );
          loading.dismiss();
        }, 2000);
      });
      this.isOpen= false;
    console.log(this.activeAddress);
    console.log(this.notActiveAddresses);
    console.log(this.gid.customer.addresses);
  }

  addNewAddress() {
    this.router.navigate(['/signup/addaddress/1']);
  }

  goToDetailPage(id: number) {
    console.log(id);
    this.router.navigate(['/home/detail/' + id]);
  }

  addToCart(product) {
    this.cartService.addProduct(product);
  }

  removeItemToCart(product) {
    this.cartService.decreaseProduct(product);
    console.log(product.quantity);
  }

}
