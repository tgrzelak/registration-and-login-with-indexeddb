import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidationProperties } from 'src/app/shared/validation/validation-properties.const';
import { FormConfig } from 'src/app/shared/_models/form-config.model';
import { REGISTRATION_FORM } from 'src/app/shared/_consts/registration-form.enum';

@Injectable({
  providedIn: 'root'
})
export class LoginFormBuilderService {

  protected form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  public build() {
    return this.createConfig();
  }

  private createConfig(): FormConfig {
    return {
      form: this.createForm(),
      buttonLabel: 'Login',
      controls: [
        {
          label: 'Login',
          placeholder: 'Please put your login',
          type: 'text',
          required: true,
          formControlName: REGISTRATION_FORM.login,
          formErrors: [
            {
              type: ['required'],
              label: 'Login is required'
            },
            {
              type: ['maxlength'],
              label: 'Value is too long'
            }
          ]
        },
        {
          label: 'Password',
          placeholder: 'Please put your password',
          type: 'password',
          required: true,
          formControlName: REGISTRATION_FORM.password,
          formErrors: [
            {
              type: ['required'],
              label: 'Password is required'
            },
            {
              type: ['hasCapitalCase', 'hasLowerCase', 'hasSpecialCharacter', 'hasDigit'],
              label: 'Please enter a valid password'
            },
            {
              type: ['maxlength'],
              label: 'Value is too long'
            },
            {
              type: ['minlength'],
              label: 'Value is too short'
            }
          ]
        }
      ]
    };
  }

  protected createForm(): FormGroup {
    return this.formBuilder.group({
      login: new FormControl(null, [
        Validators.required,
        Validators.maxLength(40)
      ]),
      password: new FormControl(null,
        ValidationProperties.passwordValidation
      )
    });
  }


}
