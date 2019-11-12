import { TestBed } from '@angular/core/testing';

import { BasicAuthInterceptor } from './basic-auth.interceptor';

describe('BasicAuthInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BasicAuthInterceptor = TestBed.get(BasicAuthInterceptor);
    expect(service).toBeTruthy();
  });
});
