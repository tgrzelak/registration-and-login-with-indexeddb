import { FormGroup, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export class ValidationFunctions {
  static passwordMatchValidator(group: FormGroup) {
    const password: string = group.get('password').value;
    const confirmPassword: string = group.get('confirmPassword').value;
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        group.get('confirmPassword').setErrors({NoPasswordMatch: true});
      } else {
        group.get('confirmPassword').setErrors(null);
      }
    }
  }

  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }
}
