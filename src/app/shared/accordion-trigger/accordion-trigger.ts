import { CommonModule } from '@angular/common';
import { Component, Host, Input, Optional } from '@angular/core';
import { AccordionItem } from '../accordion-item/accordion-item';

@Component({
  selector: 'app-accordion-trigger',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion-trigger.html',
  styleUrl: './accordion-trigger.css',
})
export class AccordionTrigger {
  @Input() className = '';
  @Input() disabled = false;

  constructor(@Optional() @Host() private readonly accordionItem: AccordionItem | null) { }

  get classes(): string[] {
    return [
      'focus-visible:border-ring',
      'focus-visible:ring-ring/50',
      'flex',
      'flex-1',
      'items-start',
      'justify-between',
      'gap-4',
      'rounded-md',
      'py-4',
      'text-left',
      'text-sm',
      'font-medium',
      'transition-all',
      'outline-none',
      'hover:underline',
      'focus-visible:ring-[3px]',
      'disabled:pointer-events-none',
      'disabled:opacity-50',
      '[&[data-state=open]>svg]:rotate-180',
      ...this.className.split(' ').filter(Boolean),
    ];
  }

  get isOpen(): boolean {
    return this.accordionItem?.isOpen ?? false;
  }

  get isDisabled(): boolean {
    return this.disabled || (this.accordionItem?.disabled ?? false);
  }

  get contentId(): string | null {
    return this.accordionItem?.contentId ?? null;
  }

  get triggerId(): string | null {
    return this.accordionItem?.triggerId ?? null;
  }

  toggle(): void {
    this.accordionItem?.toggle();
  }

}
