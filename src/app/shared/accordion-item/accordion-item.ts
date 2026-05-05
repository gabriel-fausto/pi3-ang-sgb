import { CommonModule } from '@angular/common';
import { Component, Input, Optional } from '@angular/core';
import { Accordion } from '../accordion/accordion';

@Component({
  selector: 'app-accordion-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion-item.html',
  styleUrl: './accordion-item.css',
})
export class AccordionItem {
  @Input() className = '';
  @Input() disabled = false;
  @Input() open = false;
  @Input() value?: string;

  readonly generatedValue = `accordion-item-${Math.random().toString(36).slice(2, 11)}`;
  readonly contentId = `accordion-content-${Math.random().toString(36).slice(2, 11)}`;
  readonly triggerId = `accordion-trigger-${Math.random().toString(36).slice(2, 11)}`;

  constructor(@Optional() private readonly accordion: Accordion | null) { }

  get classes(): string[] {
    return ['border-b', 'last:border-b-0', ...this.className.split(' ').filter(Boolean)];
  }

  get itemValue(): string {
    return this.value || this.generatedValue;
  }

  get isOpen(): boolean {
    return this.accordion?.isItemOpen(this.itemValue) ?? this.open;
  }

  toggle(): void {
    if (this.disabled) {
      return;
    }

    if (this.accordion) {
      this.accordion.toggleItem(this.itemValue);
      return;
    }

    this.open = !this.open;
  }

}
