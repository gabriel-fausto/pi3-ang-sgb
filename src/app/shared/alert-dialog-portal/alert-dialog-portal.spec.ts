import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDialogPortal } from './alert-dialog-portal';

describe('AlertDialogPortal', () => {
  let component: AlertDialogPortal;
  let fixture: ComponentFixture<AlertDialogPortal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertDialogPortal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertDialogPortal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
