import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar-image.html',
  styleUrl: './avatar-image.css',
})
export class AvatarImage {
  @Input() className = '';
  @Input() src?: string;
  @Input() alt = '';

  get classes(): string[] {
    return ['aspect-square', 'size-full', ...this.className.split(' ').filter(Boolean)];
  }

}
