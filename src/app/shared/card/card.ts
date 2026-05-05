import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() className = '';
  @Input() padding: 'none' | 'sm' | 'md' | 'lg' = 'md';

  get classes(): string[] {
    return [
      'bg-card',
      'rounded-xl',
      'border',
      'border-border/50',
      'transition-all',
      'duration-300',
      'hover:shadow-xl',
      this.paddingClass,
      ...this.className.split(' ').filter(Boolean),
    ];
  }

  get paddingClass(): string {
    switch (this.padding) {
      case 'none':
        return 'p-0';
      case 'sm':
        return 'p-4';
      case 'lg':
        return 'p-8';
      case 'md':
      default:
        return 'p-6';
    }
  }
}
