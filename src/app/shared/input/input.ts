import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Injector, Input as AngularInput, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.html',
  styleUrl: './input.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Input),
      multi: true,
    },
  ],
})
export class Input implements ControlValueAccessor, OnInit {
  @AngularInput() className = '';
  @AngularInput() label?: string;
  @AngularInput() error?: string;
  @AngularInput() helperText?: string;
  @AngularInput() id?: string;
  @AngularInput() type = 'text';
  @AngularInput() placeholder?: string;
  @AngularInput() disabled = false;
  @AngularInput() req = false;
  @AngularInput() autocomplete?: string;
  @AngularInput() name?: string;
  @AngularInput() value = '';
  @AngularInput() min?: string | number;
  @AngularInput() max?: string | number;
  @AngularInput() maxlength?: string | number;
  @AngularInput() ariaLabel?: string;

  @Output() valueChange = new EventEmitter<string>();

  readonly generatedId = `input-${Math.random().toString(36).slice(2, 11)}`;
  private onChange: (value: string) => void = () => { };
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

  get inputId(): string {
    return this.id || this.generatedId;
  }

  get describedBy(): string | null {
    if (this.currentError) {
      return `${this.inputId}-error`;
    }

    if (this.helperText) {
      return `${this.inputId}-helper`;
    }

    return null;
  }

  get inputClasses(): string[] {
    return [
      'flex h-12 w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3',
      'text-gray-900 placeholder:text-gray-400',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:border-purple-500',
      'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
      'transition-all duration-200',
      'hover:border-gray-300',
      ...(this.currentError
        ? ['border-red-300', 'focus-visible:ring-red-500', 'focus-visible:border-red-500']
        : []),
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

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(target.value);
    this.valueChange.emit(target.value);
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(value: string | null): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
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
      return 'Este campo e obrigatorio.';
    }

    if (errors['email']) {
      return 'Informe um e-mail valido.';
    }

    if (errors['minlength']) {
      return `Informe pelo menos ${errors['minlength'].requiredLength} caracteres.`;
    }

    if (errors['maxlength']) {
      return `Informe no maximo ${errors['maxlength'].requiredLength} caracteres.`;
    }

    if (errors['min']) {
      return `Informe um valor maior ou igual a ${errors['min'].min}.`;
    }

    if (errors['max']) {
      return `Informe um valor menor ou igual a ${errors['max'].max}.`;
    }

    if (errors['pattern']) {
      return 'Valor em formato invalido.';
    }

    return 'Valor invalido.';
  }

}
