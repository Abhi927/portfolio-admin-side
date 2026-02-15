import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';


@NgModule({
  declarations: [
  LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    CommonModule
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
