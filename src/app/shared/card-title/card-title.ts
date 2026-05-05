import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card-title',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card-title.html',
  styleUrl: './card-title.css',
})
export class CardTitle {
  @Input() className = '';

  get classes(): string[] {
    return [
      'font-semibold',
      'text-card-foreground',
      ...this.className.split(' ').filter(Boolean),
    ];
  }
}
