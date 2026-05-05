import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDialogDescription } from './alert-dialog-description';

describe('AlertDialogDescription', () => {
  let component: AlertDialogDescription;
  let fixture: ComponentFixture<AlertDialogDescription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertDialogDescription]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertDialogDescription);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
