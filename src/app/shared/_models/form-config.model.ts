import { FormGroup } from '@angular/forms';

export interface FormConfig {
  form: FormGroup;
  buttonLabel: string;
  controls: FormControls[];
}

export interface FormControls {
  label: string;
  placeholder: string;
  type: string;
  formControlName: string;
  formErrors: FormInputError[];
}

export interface FormInputError {
  type: string[];
  label: string;
}
