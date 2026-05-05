import { CommonModule } from '@angular/common';
import { Component, Host, Input, Optional } from '@angular/core';
import { AlertDialog } from '../alert-dialog/alert-dialog';

@Component({
  selector: 'app-alert-dialog-cancel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-dialog-cancel.html',
  styleUrl: './alert-dialog-cancel.css',
})
export class AlertDialogCancel {
  @Input() className = '';
  @Input() title = 'Alert dialog cancel';

  constructor(@Optional() @Host() private readonly alertDialog: AlertDialog | null) { }

  get classes(): string[] {
    return [
      'inline-flex',
      'items-center',
      'justify-center',
      'gap-2',
      'rounded-xl',
      'transition-all',
      'duration-300',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-offset-2',
      'disabled:opacity-50',
      'disabled:pointer-events-none',
      'font-semibold',
      'shadow-sm',
      'hover:shadow-md',
      'active:scale-95',
      'border-2',
      'border-gray-300',
      'bg-white',
      'text-gray-700',
      'hover:bg-gray-50',
      'focus-visible:ring-gray-500',
      'h-11',
      'px-6',
      ...this.className.split(' ').filter(Boolean),
    ];
  }

  cancel(): void {
    this.alertDialog?.closeDialog();
  }

}
