import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LOGIN_ROUTE } from './login/_consts/login-routes.const';
import { REGISTRATION_ROUTE } from './registration/_consts/registration-routes.const';
import { MY_ACCOUNT_ROUTE } from './my-account/_consts/my-account.routes.const';


const APP_ROUTING: Routes = [
  {
    path: '',
    redirectTo: LOGIN_ROUTE,
    pathMatch: 'full'
  },
  {
    path: LOGIN_ROUTE,
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: REGISTRATION_ROUTE,
    loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule)
  },
  {
    path: MY_ACCOUNT_ROUTE,
    loadChildren: () => import('./my-account/my-account.module').then(m => m.MyAccountModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTING)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
