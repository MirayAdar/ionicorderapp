import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./index/index.module').then(m => m.IndexPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./screens/orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'shopping-cart',
    loadChildren: () => import('./screens/shopping-cart/shopping-cart.module').then( m => m.ShoppingCartPageModule)
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./screens/product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  },
  {
    path: 'sms-verification',
    loadChildren: () => import('./screens/sms-verification/sms-verification.module').then( m => m.SmsVerificationPageModule)
  },
  {
    path: 'myaddress',
    loadChildren: () => import('./screens/myaddress/myaddress.module').then( m => m.MyaddressPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./screens/payment/payment.module').then( m => m.PaymentPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
