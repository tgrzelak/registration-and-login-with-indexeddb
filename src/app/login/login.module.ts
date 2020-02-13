import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { RouterModule } from '@angular/router';
import { LOGIN_ROUTING } from './_consts/login-routing.const';
import { LoginFormBuilderService } from './_services/login-form-builder/login-form-builder.service';
import { SharedModule } from '../shared/shared.module';
import { LoginService } from './_services/login-service/login.service';
import { MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule.forChild(LOGIN_ROUTING)
  ],
  providers: [
    LoginFormBuilderService,
    LoginService
  ]
})
export class LoginModule { }
