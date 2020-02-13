import { Validators } from '@angular/forms';
import { ValidationPatterns } from './validation-patterns.const';
import { ValidationFunctions } from './validation-functions.const';

export const ValidationProperties = {
  passwordValidation: Validators.compose([
    Validators.required,
    ValidationFunctions.patternValidator(ValidationPatterns.requiredCapitalCase, { hasCapitalCase: true }),
    ValidationFunctions.patternValidator(ValidationPatterns.requiredLowerCase, { hasLowerCase: true }),
    ValidationFunctions.patternValidator(ValidationPatterns.requiredSpecialCharacter, { hasSpecialCharacter: true }),
    ValidationFunctions.patternValidator(ValidationPatterns.requiredDigit, { hasDigit: true }),
    Validators.maxLength(126),
    Validators.minLength(8),
  ])
}
