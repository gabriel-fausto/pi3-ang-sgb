import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { AlertDialog } from './alert-dialog';
import { AlertDialogAction } from '../alert-dialog-action/alert-dialog-action';
import { AlertDialogCancel } from '../alert-dialog-cancel/alert-dialog-cancel';
import { AlertDialogContent } from '../alert-dialog-content/alert-dialog-content';
import { AlertDialogDescription } from '../alert-dialog-description/alert-dialog-description';
import { AlertDialogFooter } from '../alert-dialog-footer/alert-dialog-footer';
import { AlertDialogHeader } from '../alert-dialog-header/alert-dialog-header';
import { AlertDialogOverlay } from '../alert-dialog-overlay/alert-dialog-overlay';
import { AlertDialogPortal } from '../alert-dialog-portal/alert-dialog-portal';
import { AlertDialogTitle } from '../alert-dialog-title/alert-dialog-title';
import { AlertDialogTrigger } from '../alert-dialog-trigger/alert-dialog-trigger';

describe('AlertDialog', () => {
  let component: AlertDialog;
  let fixture: ComponentFixture<AlertDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertDialog]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AlertDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  standalone: true,
  imports: [
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    AlertDialogPortal,
    AlertDialogTitle,
    AlertDialogTrigger,
  ],
  template: `
    <app-alert-dialog [(open)]="open">
      <app-alert-dialog-trigger>Delete item</app-alert-dialog-trigger>
      <app-alert-dialog-portal>
        <app-alert-dialog-overlay></app-alert-dialog-overlay>
        <app-alert-dialog-content>
          <app-alert-dialog-header>
            <app-alert-dialog-title>Are you sure?</app-alert-dialog-title>
            <app-alert-dialog-description>This action cannot be undone.</app-alert-dialog-description>
          </app-alert-dialog-header>
          <app-alert-dialog-footer>
            <app-alert-dialog-cancel>Cancel</app-alert-dialog-cancel>
            <app-alert-dialog-action>Continue</app-alert-dialog-action>
          </app-alert-dialog-footer>
        </app-alert-dialog-content>
      </app-alert-dialog-portal>
    </app-alert-dialog>
  `,
})
class AlertDialogHostComponent {
  open = false;
}

describe('AlertDialog contract', () => {
  let fixture: ComponentFixture<AlertDialogHostComponent>;
  let host: AlertDialogHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertDialogHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertDialogHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('opens when the trigger is clicked', () => {
    const trigger = fixture.nativeElement.querySelector('[data-slot="alert-dialog-trigger"]') as HTMLButtonElement;

    trigger.click();
    fixture.detectChanges();

    expect(host.open).toBeTrue();
    expect(fixture.nativeElement.querySelector('[data-slot="alert-dialog-content"]')).not.toBeNull();
  });

  it('closes when cancel is clicked', () => {
    host.open = true;
    fixture.detectChanges();

    const cancel = fixture.nativeElement.querySelector('app-alert-dialog-cancel button') as HTMLButtonElement;
    cancel.click();
    fixture.detectChanges();

    expect(host.open).toBeFalse();
  });

  it('closes when action is clicked', () => {
    host.open = true;
    fixture.detectChanges();

    const action = fixture.nativeElement.querySelector('app-alert-dialog-action button') as HTMLButtonElement;
    action.click();
    fixture.detectChanges();

    expect(host.open).toBeFalse();
  });
});
