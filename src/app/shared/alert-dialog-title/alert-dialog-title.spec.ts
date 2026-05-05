import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDialogTitle } from './alert-dialog-title';

describe('AlertDialogTitle', () => {
  let component: AlertDialogTitle;
  let fixture: ComponentFixture<AlertDialogTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertDialogTitle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertDialogTitle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
