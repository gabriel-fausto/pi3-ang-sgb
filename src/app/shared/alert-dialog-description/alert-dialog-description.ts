import { CommonModule } from '@angular/common';
import { Component, Host, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { AlertDialog } from '../alert-dialog/alert-dialog';

@Component({
  selector: 'app-alert-dialog-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-dialog-description.html',
  styleUrl: './alert-dialog-description.css',
})
export class AlertDialogDescription implements OnInit, OnDestroy {
  @Input() className = '';
  @Input() id = `alert-dialog-description-${Math.random().toString(36).slice(2, 11)}`;

  constructor(@Optional() @Host() private readonly alertDialog: AlertDialog | null) { }

  get classes(): string[] {
    return ['text-muted-foreground', 'text-sm', ...this.className.split(' ').filter(Boolean)];
  }

  ngOnInit(): void {
    this.alertDialog?.registerDescription(this.id);
  }

  ngOnDestroy(): void {
    this.alertDialog?.unregisterDescription(this.id);
  }

}
