export const ValidationPatterns = {
  requiredCapitalCase: /[A-Z]/,
  requiredLowerCase: /[a-z]/,
  requiredDigit: /[0-9]/,
  requiredSpecialCharacter: /[\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
  email: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
};
