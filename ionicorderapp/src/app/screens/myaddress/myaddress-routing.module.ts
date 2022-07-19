import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyaddressPage } from './myaddress.page';

const routes: Routes = [
  {
    path: '',
    component: MyaddressPage
  },
  {
    path: 'create-adress',
    loadChildren: () => import('./create-address/create-adress.module').then( m => m.CreateAdressPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyaddressPageRoutingModule {}
