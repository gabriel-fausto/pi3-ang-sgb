import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion.html',
  styleUrl: './accordion.css',
})
export class Accordion implements OnChanges {
  @Input() className = '';
  @Input() type: 'single' | 'multiple' = 'single';
  @Input({ transform: booleanAttribute }) collapsible = false;
  @Input() value?: string | string[] | null;
  @Input() defaultValue?: string | string[] | null;

  @Output() valueChange = new EventEmitter<string | string[] | undefined>();

  private currentValues: string[] = [];

  constructor() {
    this.currentValues = this.normalizeValue(this.defaultValue);
  }

  get classes(): string[] {
    return this.className.split(' ').filter(Boolean);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('value' in changes) {
      this.currentValues = this.normalizeValue(this.value);
      return;
    }

    if ('defaultValue' in changes && !this.isControlled) {
      this.currentValues = this.normalizeValue(this.defaultValue);
    }
  }

  isItemOpen(itemValue: string): boolean {
    return this.currentValues.includes(itemValue);
  }

  toggleItem(itemValue: string): void {
    const isOpen = this.isItemOpen(itemValue);

    if (this.type === 'multiple') {
      const nextValues = isOpen
        ? this.currentValues.filter((value) => value !== itemValue)
        : [...this.currentValues, itemValue];
      this.commit(nextValues);
      return;
    }

    if (isOpen) {
      if (this.collapsible) {
        this.commit([]);
      }
      return;
    }

    this.commit([itemValue]);
  }

  private commit(nextValues: string[]): void {
    if (!this.isControlled) {
      this.currentValues = nextValues;
    }

    this.valueChange.emit(this.serializeValue(nextValues));
  }

  private get isControlled(): boolean {
    return this.value !== undefined;
  }

  private normalizeValue(source: string | string[] | null | undefined): string[] {
    if (Array.isArray(source)) {
      return source.filter(Boolean);
    }

    if (typeof source === 'string' && source.length > 0) {
      return [source];
    }

    return [];
  }

  private serializeValue(source: string[]): string | string[] | undefined {
    if (this.type === 'multiple') {
      return source;
    }

    return source[0];
  }

}
