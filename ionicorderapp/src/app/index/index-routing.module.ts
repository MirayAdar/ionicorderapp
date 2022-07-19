import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
        path: 'signup',
        loadChildren: () => import("../screens/auth/signup/signup.module").then(m => m.SignupPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexPageRoutingModule { }
