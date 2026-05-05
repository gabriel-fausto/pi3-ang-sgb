import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDialogOverlay } from './alert-dialog-overlay';

describe('AlertDialogOverlay', () => {
  let component: AlertDialogOverlay;
  let fixture: ComponentFixture<AlertDialogOverlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertDialogOverlay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertDialogOverlay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
