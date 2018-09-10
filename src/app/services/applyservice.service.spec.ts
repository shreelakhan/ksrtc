import { TestBed, inject } from '@angular/core/testing';

import { ApplyserviceService } from './applyservice.service';

describe('ApplyserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplyserviceService]
    });
  });

  it('should be created', inject([ApplyserviceService], (service: ApplyserviceService) => {
    expect(service).toBeTruthy();
  }));
});
