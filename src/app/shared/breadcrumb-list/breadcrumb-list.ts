import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumb-list.html',
  styleUrl: './breadcrumb-list.css',
})
export class BreadcrumbList {
  @Input() className = '';

  get classes(): string[] {
    return [
      'text-muted-foreground',
      'flex',
      'flex-wrap',
      'items-center',
      'gap-1.5',
      'text-sm',
      'break-words',
      'sm:gap-2.5',
      ...this.className.split(' ').filter(Boolean),
    ];
  }

}
