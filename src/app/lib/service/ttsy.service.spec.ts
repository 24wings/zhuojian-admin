import { TestBed, inject } from '@angular/core/testing';

import { TtsyService } from './ttsy.service';

describe('TtsyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TtsyService]
    });
  });

  it('should be created', inject([TtsyService], (service: TtsyService) => {
    expect(service).toBeTruthy();
  }));
});
