import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.html',
  styleUrl: './avatar.css',
})
export class Avatar {
  @Input() className = '';

  get classes(): string[] {
    return [
      'relative',
      'flex',
      'size-10',
      'shrink-0',
      'overflow-hidden',
      'rounded-full',
      ...this.className.split(' ').filter(Boolean),
    ];
  }

}
