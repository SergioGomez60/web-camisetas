import { TestBed } from '@angular/core/testing';

import { Cajas } from './cajas';

describe('Cajas', () => {
  let service: Cajas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cajas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
