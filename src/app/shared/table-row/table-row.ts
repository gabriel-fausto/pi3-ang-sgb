import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-row.html',
  styleUrl: './table-row.css',
})
export class TableRow {
  @Input() className = '';

  get classes(): string[] {
    return [
      'border-b',
      'border-border',
      'hover:bg-muted/50',
      'transition-colors',
      ...this.className.split(' ').filter(Boolean),
    ];
  }

}
