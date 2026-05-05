import { CommonModule } from '@angular/common';
import { Component, Host, Input, Optional } from '@angular/core';
import { AccordionItem } from '../accordion-item/accordion-item';

@Component({
  selector: 'app-accordion-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion-content.html',
  styleUrl: './accordion-content.css',
})
export class AccordionContent {
  @Input() className = '';

  constructor(@Optional() @Host() private readonly accordionItem: AccordionItem | null) { }

  get isOpen(): boolean {
    return this.accordionItem?.isOpen ?? false;
  }

  get classes(): string[] {
    return ['pt-0', 'pb-4', ...this.className.split(' ').filter(Boolean)];
  }

  get contentId(): string | null {
    return this.accordionItem?.contentId ?? null;
  }

  get triggerId(): string | null {
    return this.accordionItem?.triggerId ?? null;
  }

}
