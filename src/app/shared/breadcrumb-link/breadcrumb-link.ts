import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumb-link.html',
  styleUrl: './breadcrumb-link.css',
})
export class BreadcrumbLink {
  @Input() className = '';
  @Input() href?: string;
  @Input() title = 'Breadcrumb link';
  @Input() asChild = false;

  get classes(): string[] {
    return ['hover:text-foreground', 'transition-colors', ...this.className.split(' ').filter(Boolean)];
  }

}
