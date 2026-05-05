import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-dialog-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-dialog-header.html',
  styleUrl: './alert-dialog-header.css',
})
export class AlertDialogHeader {
  @Input() className = '';

  get classes(): string[] {
    return ['flex', 'flex-col', 'gap-2', 'text-center', 'sm:text-left', ...this.className.split(' ').filter(Boolean)];
  }

}
