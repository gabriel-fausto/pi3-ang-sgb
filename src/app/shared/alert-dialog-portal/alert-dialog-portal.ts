import { CommonModule } from '@angular/common';
import { Component, Host, Optional } from '@angular/core';
import { AlertDialog } from '../alert-dialog/alert-dialog';

@Component({
  selector: 'app-alert-dialog-portal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-dialog-portal.html',
  styleUrl: './alert-dialog-portal.css',
})
export class AlertDialogPortal {
  constructor(@Optional() @Host() private readonly alertDialog: AlertDialog | null) { }

  get isOpen(): boolean {
    return this.alertDialog?.isOpen ?? false;
  }

}
