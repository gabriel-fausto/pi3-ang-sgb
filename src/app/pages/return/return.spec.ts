import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Return } from './return';

describe('Return', () => {
  let component: Return;
  let fixture: ComponentFixture<Return>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Return],
      providers: [provideRouter([])],
    })
      .compileComponents();

    fixture = TestBed.createComponent(Return);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
