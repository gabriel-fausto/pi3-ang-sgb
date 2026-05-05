import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-head',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-head.html',
  styleUrl: './table-head.css',
})
export class TableHead {
  @Input() className = '';

  get classes(): string[] {
    return [
      'px-4',
      'py-3',
      'text-left',
      'font-semibold',
      'text-sm',
      'text-foreground',
      ...this.className.split(' ').filter(Boolean),
    ];
  }

}
