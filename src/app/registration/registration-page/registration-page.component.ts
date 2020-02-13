import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RegistrationFormBuilderService } from '../_services/registration-form-builder/registration-form-builder.service';
import { RegistrationService } from '../_services/registration-service/registration.service';
import { REGISTRATION_FORM } from './../../shared/_consts/registration-form.enum';
import { FormConfig } from './../../shared/_models/form-config.model';
import { RegistrationModel } from './../_models/registration.model';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  config: FormConfig;
  constructor(
    private formConfigBinder: RegistrationFormBuilderService,
    private registrationService: RegistrationService,
    private toastr: ToastrService,
  ) {
    this.config = this.formConfigBinder.build();
  }

  ngOnInit() {
  }

  onRegister() {
    this.config.form.markAllAsTouched();
    if (this.config.form.valid) {
      const newUser: RegistrationModel = {
        firstName: this.config.form.get(REGISTRATION_FORM.firstName).value,
        lastName: this.config.form.get(REGISTRATION_FORM.lastName).value,
        email: this.config.form.get(REGISTRATION_FORM.email).value,
        password: this.config.form.get(REGISTRATION_FORM.password).value,
        isLogged: false
      };
      this.registrationService.createUser(newUser);
    } else {
      this.toastr.error(`Please check your data, form is invalid`);
    }
  }

}
