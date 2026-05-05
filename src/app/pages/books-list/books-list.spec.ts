import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { BooksList } from './books-list';

describe('BooksList', () => {
  let component: BooksList;
  let fixture: ComponentFixture<BooksList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksList],
      providers: [provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BooksList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
