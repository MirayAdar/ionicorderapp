import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressdetailPage } from './addressdetail.page';

const routes: Routes = [
  {
    path: '',
    component: AddressdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddressdetailPageRoutingModule {}
