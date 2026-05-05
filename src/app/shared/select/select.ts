import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Injector, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, ValidationErrors } from '@angular/forms';

interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.html',
  styleUrl: './select.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Select),
      multi: true,
    },
  ],
})
export class Select implements ControlValueAccessor, OnInit {
  @Input() className = '';
  @Input() label?: string;
  @Input() error?: string;
  @Input() options: SelectOption[] = [];
  @Input() id?: string;
  @Input() name?: string;
  @Input() title = 'Select field';
  @Input() disabled = false;
  @Input() required = false;
  @Input() value = '';

  @Output() valueChange = new EventEmitter<string>();

  readonly generatedId = `select-${Math.random().toString(36).slice(2, 11)}`;
  private onValueChange: (value: string) => void = () => { };
  private onTouched: () => void = () => { };
  private resolvedNgControl: NgControl | null = null;

  constructor(private readonly injector: Injector) {
  }

  ngOnInit(): void {
    this.resolvedNgControl = this.injector.get(NgControl, null, { self: true, optional: true });

    if (this.resolvedNgControl) {
      this.resolvedNgControl.valueAccessor = this;
    }
  }

  get ngControl(): NgControl | null {
    return this.resolvedNgControl;
  }

  get selectId(): string {
    return this.id || this.generatedId;
  }

  get selectClasses(): string[] {
    return [
      'flex',
      'h-11',
      'w-full',
      'rounded-md',
      'border',
      'border-input',
      'bg-input-background',
      'px-4',
      'py-2',
      'text-foreground',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-primary',
      'focus-visible:border-primary',
      'disabled:cursor-not-allowed',
      'disabled:opacity-50',
      'transition-colors',
      ...(this.currentError ? ['border-[#E53E3E]', 'focus-visible:ring-[#E53E3E]'] : []),
      ...this.className.split(' ').filter(Boolean),
    ];
  }

  get currentError(): string | undefined {
    return this.error || this.autoErrorMessage;
  }

  private get autoErrorMessage(): string | undefined {
    if (!this.shouldShowControlError) {
      return undefined;
    }

    return this.mapErrorsToMessage(this.ngControl?.errors);
  }

  private get shouldShowControlError(): boolean {
    const control = this.ngControl?.control;
    return !!control?.invalid && (!!control.touched || !!control.dirty);
  }

  onChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
    this.onValueChange(target.value);
    this.valueChange.emit(target.value);
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(value: string | null): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onValueChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private mapErrorsToMessage(errors: ValidationErrors | null | undefined): string | undefined {
    if (!errors) {
      return undefined;
    }

    if (errors['required']) {
      return 'Selecione uma opcao.';
    }

    return 'Valor invalido.';
  }

}
