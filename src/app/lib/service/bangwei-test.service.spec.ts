import { TestBed, inject } from '@angular/core/testing';

import { BangweiTestService } from './bangwei-test.service';

describe('BangweiTestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BangweiTestService]
    });
  });

  it('should be created', inject([BangweiTestService], (service: BangweiTestService) => {
    expect(service).toBeTruthy();
  }));
});
