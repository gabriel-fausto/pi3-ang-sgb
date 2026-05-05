import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumb-page.html',
  styleUrl: './breadcrumb-page.css',
})
export class BreadcrumbPage {
  @Input() className = '';
  @Input() title = 'Current page';

  get classes(): string[] {
    return ['text-foreground', 'font-normal', ...this.className.split(' ').filter(Boolean)];
  }

}
