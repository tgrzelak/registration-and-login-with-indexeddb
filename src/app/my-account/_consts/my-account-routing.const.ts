import { Route } from '@angular/router';
import { MyAccountComponent } from '../my-account/my-account.component';
import { AuthGuard } from './../../shared/_guards/auth-guard/auth-guard.service';

export const MY_ACCOUNT_ROUTING: Route[] = [
  {
    path: '',
    component: MyAccountComponent,
    canActivate: [AuthGuard]
  }
];
