import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  @Input() className = '';

  get classes(): string[] {
    return ['w-full', 'border-collapse', ...this.className.split(' ').filter(Boolean)];
  }

}
