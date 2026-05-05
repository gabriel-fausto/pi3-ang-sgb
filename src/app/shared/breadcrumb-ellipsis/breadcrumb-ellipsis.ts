import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule, LucideMoreHorizontal } from 'lucide-angular';

@Component({
  selector: 'app-breadcrumb-ellipsis',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './breadcrumb-ellipsis.html',
  styleUrl: './breadcrumb-ellipsis.css',
})
export class BreadcrumbEllipsis {
  protected readonly iconMoreHorizontal = LucideMoreHorizontal;

  @Input() className = '';

  get classes(): string[] {
    return ['flex', 'size-9', 'items-center', 'justify-center', ...this.className.split(' ').filter(Boolean)];
  }

}
