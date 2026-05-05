import { CommonModule } from '@angular/common';
import { Component, Host, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { AlertDialog } from '../alert-dialog/alert-dialog';

@Component({
  selector: 'app-alert-dialog-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-dialog-title.html',
  styleUrl: './alert-dialog-title.css',
})
export class AlertDialogTitle implements OnInit, OnDestroy {
  @Input() className = '';
  @Input() id = `alert-dialog-title-${Math.random().toString(36).slice(2, 11)}`;

  constructor(@Optional() @Host() private readonly alertDialog: AlertDialog | null) { }

  get classes(): string[] {
    return ['text-lg', 'font-semibold', ...this.className.split(' ').filter(Boolean)];
  }

  ngOnInit(): void {
    this.alertDialog?.registerTitle(this.id);
  }

  ngOnDestroy(): void {
    this.alertDialog?.unregisterTitle(this.id);
  }

}
