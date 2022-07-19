import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompletedOrderPage } from './completed-order.page';

const routes: Routes = [
  {
    path: '',
    component: CompletedOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompletedOrderPageRoutingModule {}
