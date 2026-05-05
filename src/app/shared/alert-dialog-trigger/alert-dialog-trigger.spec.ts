import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDialogTrigger } from './alert-dialog-trigger';

describe('AlertDialogTrigger', () => {
  let component: AlertDialogTrigger;
  let fixture: ComponentFixture<AlertDialogTrigger>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertDialogTrigger]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertDialogTrigger);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
