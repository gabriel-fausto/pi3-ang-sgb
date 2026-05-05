import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card-footer',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card-footer.html',
  styleUrl: './card-footer.css',
})
export class CardFooter {
  @Input() className = '';

  get classes(): string[] {
    return [
      'mt-4',
      'flex',
      'items-center',
      'gap-2',
      ...this.className.split(' ').filter(Boolean),
    ];
  }
}
