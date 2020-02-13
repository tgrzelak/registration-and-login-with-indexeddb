import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MyAccountComponent } from './my-account/my-account.component';
import { MY_ACCOUNT_ROUTING } from './_consts/my-account-routing.const';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [MyAccountComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forChild(MY_ACCOUNT_ROUTING)
  ]
})
export class MyAccountModule { }
