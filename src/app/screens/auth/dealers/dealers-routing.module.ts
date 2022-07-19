import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { DealersPage } from './dealers.page';

const routes: Routes = [
  {
    path: '',
    component: DealersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DealersPageRoutingModule {}
