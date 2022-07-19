import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductsPageRoutingModule } from './products-routing.module';
import { SwiperModule } from 'swiper/angular';
import { ProductsPage } from './products.page';
import { SharedModule } from 'src/app/components/shared.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NotificationModalComponent } from 'src/app/notification-modal/notification-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsPageRoutingModule,
    SharedModule,
    Ng2SearchPipeModule,
    SwiperModule

  ],
  declarations: [ProductsPage, NotificationModalComponent]

})
export class ProductsPageModule {}
