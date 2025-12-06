import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Camisetas } from './camisetas';

describe('Camisetas', () => {
  let component: Camisetas;
  let fixture: ComponentFixture<Camisetas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Camisetas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Camisetas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
