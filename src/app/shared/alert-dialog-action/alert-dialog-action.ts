import { CommonModule } from '@angular/common';
import { Component, Host, Input, Optional } from '@angular/core';
import { AlertDialog } from '../alert-dialog/alert-dialog';

@Component({
  selector: 'app-alert-dialog-action',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-dialog-action.html',
  styleUrl: './alert-dialog-action.css',
})
export class AlertDialogAction {
  @Input() className = '';
  @Input() title = 'Alert dialog action';

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
      'bg-gradient-to-r',
      'from-gray-800',
      'to-gray-900',
      'text-white',
      'hover:from-gray-900',
      'hover:to-gray-950',
      'focus-visible:ring-gray-700',
      'h-11',
      'px-6',
      ...this.className.split(' ').filter(Boolean),
    ];
  }

  confirm(): void {
    this.alertDialog?.closeDialog();
  }

}
