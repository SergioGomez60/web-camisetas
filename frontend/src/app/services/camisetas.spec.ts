import { TestBed } from '@angular/core/testing';

import { Camisetas } from './camisetas';

describe('Camisetas', () => {
  let service: Camisetas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Camisetas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
