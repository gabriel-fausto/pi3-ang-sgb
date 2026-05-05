import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Loan } from './loan';

describe('Loan', () => {
  let component: Loan;
  let fixture: ComponentFixture<Loan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Loan],
      providers: [provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Loan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
