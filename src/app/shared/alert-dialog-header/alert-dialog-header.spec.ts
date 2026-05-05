import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDialogHeader } from './alert-dialog-header';

describe('AlertDialogHeader', () => {
  let component: AlertDialogHeader;
  let fixture: ComponentFixture<AlertDialogHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertDialogHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertDialogHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
