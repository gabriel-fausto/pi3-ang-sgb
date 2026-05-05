import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDialogContent } from './alert-dialog-content';

describe('AlertDialogContent', () => {
  let component: AlertDialogContent;
  let fixture: ComponentFixture<AlertDialogContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertDialogContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertDialogContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
