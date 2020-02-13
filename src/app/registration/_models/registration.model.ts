export interface RegistrationModel {
  firstName: string;
  lastName: string;
  login: string;
  email: string;
  password: string;
  confirmPassword?: string;
  isLogged: boolean;
}
