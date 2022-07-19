import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { SharedModule } from 'src/app/components/shared.module';
import { SimpleMaskModule } from 'ngx-ion-simple-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    SharedModule,
    Ng2TelInputModule,
    ReactiveFormsModule,
    SimpleMaskModule

  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
