import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar-fallback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar-fallback.html',
  styleUrl: './avatar-fallback.css',
})
export class AvatarFallback {
  @Input() className = '';

  get classes(): string[] {
    return [
      'bg-muted',
      'flex',
      'size-full',
      'items-center',
      'justify-center',
      'rounded-full',
      ...this.className.split(' ').filter(Boolean),
    ];
  }

}
