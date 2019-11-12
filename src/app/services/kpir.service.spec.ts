import { TestBed } from '@angular/core/testing';

import { KpirService } from './kpir.service';

describe('KpirService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KpirService = TestBed.get(KpirService);
    expect(service).toBeTruthy();
  });
});
