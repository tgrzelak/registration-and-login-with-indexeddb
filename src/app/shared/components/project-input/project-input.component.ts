import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { FormInputError } from '../../_models/form-config.model';

@Component({
  selector: 'app-project-input',
  templateUrl: './project-input.component.html',
  styleUrls: ['./project-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ProjectInputComponent),
    }
  ],
})
export class ProjectInputComponent implements ControlValueAccessor {

  hide = true;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() formControlName: string;
  @Input() type = 'text';
  @Input() formGroup: FormGroup;
  @Input() errorList: FormInputError[];

  writeValue(value: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  constructor() { }
  onHasOneOfErrors(errors: string[]) {
    let invalid = false;
    errors.forEach(value => {
      if (this.formGroup.controls[this.formControlName].hasError(value)) { invalid = true; }
    });
    return this.formGroup.controls[this.formControlName].touched && invalid;
  }

}
