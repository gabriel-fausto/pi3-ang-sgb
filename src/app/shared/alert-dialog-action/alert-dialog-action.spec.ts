import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDialogAction } from './alert-dialog-action';

describe('AlertDialogAction', () => {
  let component: AlertDialogAction;
  let fixture: ComponentFixture<AlertDialogAction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertDialogAction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertDialogAction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
