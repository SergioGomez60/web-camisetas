import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Seccion3 } from './seccion3';

describe('Seccion3', () => {
  let component: Seccion3;
  let fixture: ComponentFixture<Seccion3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Seccion3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Seccion3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
