import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login-page/login.component';
import { SharedModule } from '../shared/shared.module';
import { JwtModule } from '@auth0/angular-jwt';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    JwtModule
  ],
  exports: [
    LoginComponent,
  ]
})
export class AuthModule { }
