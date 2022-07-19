import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { IonicModule } from '@ionic/angular';
import { SignupPageRoutingModule } from './signup-routing.module';
import { SignupPage } from './signup.page';
import { SharedModule } from 'src/app/components/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupPageRoutingModule,
    SharedModule,
    Ng2TelInputModule,
    ReactiveFormsModule
  ],
  declarations: [SignupPage]
})
export class SignupPageModule {}
