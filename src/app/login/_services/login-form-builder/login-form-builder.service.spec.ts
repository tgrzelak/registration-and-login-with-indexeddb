import { TestBed } from '@angular/core/testing';

import { LoginFormBuilderService } from './login-form-builder.service';

describe('LoginFormBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginFormBuilderService = TestBed.get(LoginFormBuilderService);
    expect(service).toBeTruthy();
  });
});
