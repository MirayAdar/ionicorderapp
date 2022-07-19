import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPage } from './index.page';

const routes: Routes = [
  {
    path: '',
    component: IndexPage,
    children: [
      {
        path: '',
        loadChildren: () => import("../screens/splash/splash.module").then(m => m.SplashPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import("../screens/auth/login/login.module").then(m => m.LoginPageModule)
      },
      {
        path: 'sms-verification',
        loadChildren: () => import('../screens/sms-verification/sms-verification.module').then( m => m.SmsVerificationPageModule)
      },
      {
        path: 'signup/:processType/:updatedAddressId',
        loadChildren: () => import("../screens/auth/signup/signup.module").then(m => m.SignupPageModule)
      },
      {
        path: 'dealers/:processType/:neigborhoodId/:updatedAddressId',
        loadChildren: () => import('../screens/auth/dealers/dealers.module').then( m => m.DealersPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexPageRoutingModule { }
