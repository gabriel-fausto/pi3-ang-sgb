import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-aspect-ratio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aspect-ratio.html',
  styleUrl: './aspect-ratio.css',
})
export class AspectRatio {
  @Input() className = '';
  @Input() ratio = 1;

  get classes(): string[] {
    return this.className.split(' ').filter(Boolean);
  }

  get aspectRatio(): string {
    return `${this.ratio}`;
  }

}
