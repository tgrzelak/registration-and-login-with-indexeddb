import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { REGISTRATION_FORM } from './../../shared/_consts/registration-form.enum';
import { FormConfig } from './../../shared/_models/form-config.model';
import { LoginModel } from '../_models/login.model';
import { LoginFormBuilderService } from '../_services/login-form-builder/login-form-builder.service';
import { LoginService } from '../_services/login-service/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {

  config: FormConfig;
  constructor(
    private formConfigBinder: LoginFormBuilderService,
    private loginService: LoginService,
    private toastr: ToastrService

  ) {
    this.config = this.formConfigBinder.build();
   }

  ngOnInit() {
  }

  onLogin() {
    this.config.form.markAllAsTouched();
    if (this.config.form.valid) {
      const newUser: LoginModel = {
        email: this.config.form.get(REGISTRATION_FORM.email).value,
        password: this.config.form.get(REGISTRATION_FORM.password).value,
      };
      this.loginService.login(newUser);
    } else {
      this.toastr.error(`Please check your data, form is invalid`);
    }
  }

}
