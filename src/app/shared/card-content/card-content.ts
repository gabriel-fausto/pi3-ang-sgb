import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card-content',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card-content.html',
  styleUrl: './card-content.css',
})
export class CardContent {
  @Input() className = '';

  get classes(): string[] {
    return [
      ...this.className.split(' ').filter(Boolean),
    ];
  }
}
