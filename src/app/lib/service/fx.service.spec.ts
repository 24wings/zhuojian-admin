import { TestBed, inject } from '@angular/core/testing';

import { FxService } from './fx.service';

describe('FxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FxService]
    });
  });

  it('should be created', inject([FxService], (service: FxService) => {
    expect(service).toBeTruthy();
  }));
});
