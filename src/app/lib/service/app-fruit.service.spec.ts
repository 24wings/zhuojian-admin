import { TestBed, inject } from '@angular/core/testing';

import { AppFruitService } from './app-fruit.service';

describe('AppFruitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppFruitService]
    });
  });

  it('should be created', inject([AppFruitService], (service: AppFruitService) => {
    expect(service).toBeTruthy();
  }));
});
