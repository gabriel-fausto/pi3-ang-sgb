import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card-header',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card-header.html',
  styleUrl: './card-header.css',
})
export class CardHeader {
  @Input() className = '';

  get classes(): string[] {
    return [
      'mb-4',
      ...this.className.split(' ').filter(Boolean),
    ];
  }
}
