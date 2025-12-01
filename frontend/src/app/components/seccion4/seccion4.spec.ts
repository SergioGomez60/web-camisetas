import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Seccion4 } from './seccion4';

describe('Seccion4', () => {
  let component: Seccion4;
  let fixture: ComponentFixture<Seccion4>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Seccion4]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Seccion4);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
