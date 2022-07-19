import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
        path: 'orders',
        loadChildren: () => import("../screens/orders/orders.module").then(m => m.OrdersPageModule)
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
        path: 'address',
        loadChildren: () => import("../screens/myaddress/myaddress.module").then(m => m.MyaddressPageModule)
      },
      {
        path: 'address/create-address',
        loadChildren: () => import("../screens/myaddress/create-address/create-adress.module").then(m => m.CreateAdressPageModule)
      },
      {
        path: 'payment',
        loadChildren: () => import("../screens/payment/payment.module").then(m => m.PaymentPageModule)
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
export class HomePageRoutingModule {}
