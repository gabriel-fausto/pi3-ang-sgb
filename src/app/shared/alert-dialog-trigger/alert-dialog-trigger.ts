import { CommonModule } from '@angular/common';
import { Component, Host, Input, Optional } from '@angular/core';
import { AlertDialog } from '../alert-dialog/alert-dialog';

@Component({
  selector: 'app-alert-dialog-trigger',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-dialog-trigger.html',
  styleUrl: './alert-dialog-trigger.css',
})
export class AlertDialogTrigger {
  @Input() className = '';

  constructor(@Optional() @Host() private readonly alertDialog: AlertDialog | null) { }

  get classes(): string[] {
    return this.className.split(' ').filter(Boolean);
  }

  get contentId(): string | null {
    return this.alertDialog?.contentId ?? null;
  }

  get isOpen(): boolean {
    return this.alertDialog?.isOpen ?? false;
  }

  open(): void {
    this.alertDialog?.openDialog();
  }

}
