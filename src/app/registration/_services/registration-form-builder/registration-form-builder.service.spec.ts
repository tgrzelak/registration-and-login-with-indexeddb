import { TestBed } from '@angular/core/testing';

import { RegistrationFormBuilderService } from './registration-form-builder.service';

describe('RegistrationFormBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrationFormBuilderService = TestBed.get(RegistrationFormBuilderService);
    expect(service).toBeTruthy();
  });
});
