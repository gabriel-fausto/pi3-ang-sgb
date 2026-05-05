import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDialogCancel } from './alert-dialog-cancel';

describe('AlertDialogCancel', () => {
  let component: AlertDialogCancel;
  let fixture: ComponentFixture<AlertDialogCancel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertDialogCancel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertDialogCancel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
