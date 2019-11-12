import { TestBed } from '@angular/core/testing';

import { ErrorFieldsMatcherService } from './error-fields-matcher.service';

describe('ErrorFieldsMatcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorFieldsMatcherService = TestBed.get(ErrorFieldsMatcherService);
    expect(service).toBeTruthy();
  });
});
