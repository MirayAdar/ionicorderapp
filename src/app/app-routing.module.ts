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
    path: 'shopping-cart',
    loadChildren: () => import('./screens/shopping-cart/shopping-cart.module').then( m => m.ShoppingCartPageModule)
  },
  // {
  //   path: 'detail/:id',
  //   loadChildren: () => import('./screens/product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  // },
  {
    path: 'payment',
    loadChildren: () => import('./screens/payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'addressdetail',
    loadChildren: () => import('./screens/showaddresses/addressdetail.module').then( m => m.AddressdetailPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./screens/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'last-orders',
    loadChildren: () => import('./screens/last-orders/last-orders.module').then( m => m.LastOrdersPageModule)
  }








];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
