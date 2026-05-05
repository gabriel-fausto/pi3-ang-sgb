import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDialogFooter } from './alert-dialog-footer';

describe('AlertDialogFooter', () => {
  let component: AlertDialogFooter;
  let fixture: ComponentFixture<AlertDialogFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertDialogFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertDialogFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
