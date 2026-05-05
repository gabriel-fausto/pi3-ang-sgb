import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-dialog.html',
  styleUrl: './alert-dialog.css',
})
export class AlertDialog implements OnChanges {
  @Input() className = '';
  @Input() open?: boolean;
  @Input({ transform: booleanAttribute }) defaultOpen = false;

  @Output() openChange = new EventEmitter<boolean>();

  private internalOpen = false;

  titleId: string | null = null;
  descriptionId: string | null = null;
  readonly contentId = `alert-dialog-content-${Math.random().toString(36).slice(2, 11)}`;

  constructor() {
    this.internalOpen = this.defaultOpen;
  }

  get classes(): string[] {
    return this.className.split(' ').filter(Boolean);
  }

  get isOpen(): boolean {
    return this.open ?? this.internalOpen;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('open' in changes && this.open !== undefined) {
      this.internalOpen = this.open;
      return;
    }

    if ('defaultOpen' in changes && this.open === undefined) {
      this.internalOpen = this.defaultOpen;
    }
  }

  setOpen(nextOpen: boolean): void {
    if (this.open === undefined) {
      this.internalOpen = nextOpen;
    }

    this.openChange.emit(nextOpen);
  }

  openDialog(): void {
    this.setOpen(true);
  }

  closeDialog(): void {
    this.setOpen(false);
  }

  registerTitle(id: string): void {
    this.titleId = id;
  }

  unregisterTitle(id: string): void {
    if (this.titleId === id) {
      this.titleId = null;
    }
  }

  registerDescription(id: string): void {
    this.descriptionId = id;
  }

  unregisterDescription(id: string): void {
    if (this.descriptionId === id) {
      this.descriptionId = null;
    }
  }

}
