import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-dialog-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-dialog-footer.html',
  styleUrl: './alert-dialog-footer.css',
})
export class AlertDialogFooter {
  @Input() className = '';

  get classes(): string[] {
    return ['flex', 'flex-col-reverse', 'gap-2', 'sm:flex-row', 'sm:justify-end', ...this.className.split(' ').filter(Boolean)];
  }

}
