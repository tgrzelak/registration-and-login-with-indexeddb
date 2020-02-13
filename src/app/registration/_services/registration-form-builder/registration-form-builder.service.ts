import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ValidationPatterns } from 'src/app/shared/validation/validation-patterns.const';
import { ValidationProperties } from 'src/app/shared/validation/validation-properties.const';
import { ValidationFunctions } from 'src/app/shared/validation/validation-functions.const';
import { FormConfig } from 'src/app/shared/_models/form-config.model';
import { REGISTRATION_FORM } from 'src/app/shared/_consts/registration-form.enum';

@Injectable({
  providedIn: 'root'
})
export class RegistrationFormBuilderService {
  constructor(
    private formBuilder: FormBuilder
  ) { }


  public build() {
    return this.createConfig();
  }

  private createConfig(): FormConfig {
    return {
      form: this.createForm(),
      buttonLabel: 'Register',
      controls: [
        {
          label: 'First Name',
          placeholder: 'Please put your first name',
          type: 'text',
          required: true,
          formControlName: REGISTRATION_FORM.firstName,
          formErrors: [
            {
              type: ['required'],
              label: 'First Name is required'
            },
            {
              type: ['maxlength'],
              label: 'Value is too long'
            }
          ]
        },
        {
          label: 'Last Name',
          placeholder: 'Please put your last name',
          type: 'text',
          required: true,
          formControlName: REGISTRATION_FORM.lastName,
          formErrors: [
            {
              type: ['required'],
              label: 'Last Name is required'
            },
            {
              type: ['maxlength'],
              label: 'Value is too long'
            }
          ]
        },
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
          label: 'Email',
          placeholder: 'Please put your email',
          type: 'text',
          required: true,
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
        },
        {
          label: 'Confirm Password',
          placeholder: 'Please confirm your password',
          type: 'password',
          required: true,
          formControlName: REGISTRATION_FORM.confirmPassword,
          formErrors: [
            {
              type: ['required'],
              label: 'Password confirmation is required'
            },
            {
              type: ['NoPasswordMatch'],
              label: 'Passwords are not match'
            }
          ]
        }
      ]
    };
  }

  protected createForm(): FormGroup {
    return this.formBuilder.group({
      firstName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(40)
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(40)
      ]),
      login: new FormControl(null, [
        Validators.required,
        Validators.maxLength(40)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.maxLength(80),
        Validators.pattern(ValidationPatterns.email)
      ]),
      password: new FormControl(null,
        ValidationProperties.passwordValidation
      ),
      confirmPassword: new FormControl(null,
        ValidationProperties.passwordValidation
      )
    }, {validators: ValidationFunctions.passwordMatchValidator});
  }

}
