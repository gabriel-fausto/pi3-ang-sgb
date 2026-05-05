import { CommonModule } from '@angular/common';
import { Component, Host, Input, Optional } from '@angular/core';
import { AlertDialog } from '../alert-dialog/alert-dialog';

@Component({
  selector: 'app-alert-dialog-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-dialog-overlay.html',
  styleUrl: './alert-dialog-overlay.css',
})
export class AlertDialogOverlay {
  @Input() className = '';

  constructor(@Optional() @Host() private readonly alertDialog: AlertDialog | null) { }

  get classes(): string[] {
    return [
      'data-[state=open]:animate-in',
      'data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0',
      'data-[state=open]:fade-in-0',
      'fixed',
      'inset-0',
      'z-50',
      'bg-black/50',
      ...this.className.split(' ').filter(Boolean),
    ];
  }

  get isOpen(): boolean {
    return this.alertDialog?.isOpen ?? false;
  }

}
