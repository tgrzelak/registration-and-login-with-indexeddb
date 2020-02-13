import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationPatterns } from 'src/app/shared/validation/validation-patterns.const';
import { ValidationProperties } from 'src/app/shared/validation/validation-properties.const';
import { REGISTRATION_FORM } from 'src/app/shared/_consts/registration-form.enum';
import { FormConfig } from 'src/app/shared/_models/form-config.model';

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
      buttonLabel: 'Email',
      controls: [
        {
          label: 'Email',
          placeholder: 'Please put your email',
          type: 'text',
          formControlName: REGISTRATION_FORM.email,
          formErrors: [
            {
              type: ['required'],
              label: 'Email is required'
            },
            {
              type: ['maxlength'],
              label: 'Value is too long'
            },
            {
              type: ['pattern'],
              label: 'Please enter a valid email address'
            }
          ]
        },
        {
          label: 'Password',
          placeholder: 'Please put your password',
          type: 'password',
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
      email: new FormControl(null, [
        Validators.required,
        Validators.maxLength(80),
        Validators.pattern(ValidationPatterns.email)
      ]),
      password: new FormControl(null,
        ValidationProperties.passwordValidation
      )
    });
  }


}
