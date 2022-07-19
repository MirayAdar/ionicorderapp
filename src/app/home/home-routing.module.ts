import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'products',
        loadChildren: () => import("../screens/products/products.module").then(m => m.ProductsPageModule)
      },
      {
        path: 'detail/:id',
        loadChildren: () => import("../screens/product-detail/product-detail.module").then(m => m.ProductDetailPageModule)
      },
      {
        path: 'shopping-cart',
        loadChildren: () => import("../screens/shopping-cart/shopping-cart.module").then(m => m.ShoppingCartPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import("../screens/settings/settings.module").then(m => m.SettingsPageModule)
      },
      {
        path: 'edit-profile',
        loadChildren: () => import('../screens/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
      },
      {
        path: 'addressdetail',
        loadChildren: () => import("../screens/showaddresses/addressdetail.module").then(m => m.AddressdetailPageModule)
      },
      {
        path: 'payment',
        loadChildren: () => import("../screens/payment/payment.module").then(m => m.PaymentPageModule)
      },
      {
        path: 'completed-order/:id',
        loadChildren: () => import('../screens/completed-order/completed-order.module').then( m => m.CompletedOrderPageModule)
      },
      {
        path: 'last-orders',
        loadChildren: () => import('../screens/last-orders/last-orders.module').then( m => m.LastOrdersPageModule)
      },
      {
        path: "",
        redirectTo: 'products',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
