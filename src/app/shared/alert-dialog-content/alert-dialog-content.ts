import { CommonModule } from '@angular/common';
import { Component, Host, Input, Optional } from '@angular/core';
import { AlertDialog } from '../alert-dialog/alert-dialog';

@Component({
  selector: 'app-alert-dialog-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-dialog-content.html',
  styleUrl: './alert-dialog-content.css',
})
export class AlertDialogContent {
  @Input() className = '';

  constructor(@Optional() @Host() private readonly alertDialog: AlertDialog | null) { }

  get classes(): string[] {
    return [
      'bg-background',
      'data-[state=open]:animate-in',
      'data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0',
      'data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95',
      'data-[state=open]:zoom-in-95',
      'fixed',
      'top-[50%]',
      'left-[50%]',
      'z-50',
      'grid',
      'w-full',
      'max-w-[calc(100%-2rem)]',
      'translate-x-[-50%]',
      'translate-y-[-50%]',
      'gap-4',
      'rounded-lg',
      'border',
      'p-6',
      'shadow-lg',
      'duration-200',
      'sm:max-w-lg',
      ...this.className.split(' ').filter(Boolean),
    ];
  }

  get isOpen(): boolean {
    return this.alertDialog?.isOpen ?? false;
  }

  get contentId(): string | null {
    return this.alertDialog?.contentId ?? null;
  }

  get titleId(): string | null {
    return this.alertDialog?.titleId ?? null;
  }

  get descriptionId(): string | null {
    return this.alertDialog?.descriptionId ?? null;
  }

}
