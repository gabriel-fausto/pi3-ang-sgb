import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-header.html',
  styleUrl: './table-header.css',
})
export class TableHeader {
  @Input() className = '';

  get classes(): string[] {
    return ['bg-muted', ...this.className.split(' ').filter(Boolean)];
  }

}
