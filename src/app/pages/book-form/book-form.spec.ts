import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { BookForm } from './book-form';

describe('BookForm', () => {
  let component: BookForm;
  let fixture: ComponentFixture<BookForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookForm],
      providers: [provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BookForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
