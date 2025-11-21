import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Seccion2 } from './seccion2';

describe('Seccion2', () => {
  let component: Seccion2;
  let fixture: ComponentFixture<Seccion2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Seccion2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Seccion2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
