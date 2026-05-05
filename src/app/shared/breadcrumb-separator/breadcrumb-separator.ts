import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule, LucideChevronRight } from 'lucide-angular';

@Component({
  selector: 'app-breadcrumb-separator',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './breadcrumb-separator.html',
  styleUrl: './breadcrumb-separator.css',
})
export class BreadcrumbSeparator {
  protected readonly iconChevronRight = LucideChevronRight;

  @Input() className = '';
  @Input() showDefaultIcon = true;

  get classes(): string[] {
    return ['[&>svg]:size-3.5', ...this.className.split(' ').filter(Boolean)];
  }

}
