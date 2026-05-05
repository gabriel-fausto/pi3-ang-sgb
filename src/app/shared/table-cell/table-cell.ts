import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-cell.html',
  styleUrl: './table-cell.css',
})
export class TableCell {
  @Input() className = '';

  get classes(): string[] {
    return ['px-4', 'py-3', 'text-foreground', ...this.className.split(' ').filter(Boolean)];
  }

}
