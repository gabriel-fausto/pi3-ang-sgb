import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-body.html',
  styleUrl: './table-body.css',
})
export class TableBody {
  @Input() className = '';

  get classes(): string[] {
    return this.className.split(' ').filter(Boolean);
  }

}
