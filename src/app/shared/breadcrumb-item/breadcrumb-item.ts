import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumb-item.html',
  styleUrl: './breadcrumb-item.css',
})
export class BreadcrumbItem {
  @Input() className = '';

  get classes(): string[] {
    return ['inline-flex', 'items-center', 'gap-1.5', ...this.className.split(' ').filter(Boolean)];
  }

}
