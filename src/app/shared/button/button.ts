import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input() className = '';
  @Input() ariaLabel?: string;
  @Input() variant: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'destructive' | 'success' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() fullWidth = false;
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() title = 'Button';

  get classes(): string[] {
    return [
      'inline-flex',
      'items-center',
      'justify-center',
      'gap-2',
      'rounded-xl',
      'transition-all',
      'duration-300',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-offset-2',
      'disabled:opacity-50',
      'disabled:pointer-events-none',
      'font-semibold',
      'shadow-sm',
      'hover:shadow-md',
      'active:scale-95',
      ...this.variantClasses,
      ...this.sizeClasses,
      ...(this.fullWidth ? ['w-full'] : []),
      ...this.className.split(' ').filter(Boolean),
    ];
  }

  private get variantClasses(): string[] {
    switch (this.variant) {
      case 'secondary':
        return [
          'bg-gradient-to-r',
          'from-gray-600',
          'to-gray-700',
          'text-white',
          'hover:from-gray-700',
          'hover:to-gray-800',
          'focus-visible:ring-gray-600',
        ];
      case 'accent':
        return [
          'bg-gradient-to-r',
          'from-gray-700',
          'to-gray-800',
          'text-white',
          'hover:from-gray-800',
          'hover:to-gray-900',
          'focus-visible:ring-gray-700',
        ];
      case 'outline':
        return [
          'border-2',
          'border-gray-300',
          'bg-white',
          'text-gray-700',
          'hover:bg-gray-50',
          'focus-visible:ring-gray-500',
        ];
      case 'ghost':
        return [
          'hover:bg-gray-100',
          'text-gray-700',
          'focus-visible:ring-gray-500',
        ];
      case 'destructive':
        return [
          'bg-gradient-to-r',
          'from-red-500',
          'to-red-600',
          'text-white',
          'hover:from-red-600',
          'hover:to-red-700',
          'focus-visible:ring-red-500',
        ];
      case 'success':
        return [
          'bg-gradient-to-r',
          'from-green-500',
          'to-green-600',
          'text-white',
          'hover:from-green-600',
          'hover:to-green-700',
          'focus-visible:ring-green-500',
        ];
      case 'primary':
      default:
        return [
          'bg-gradient-to-r',
          'from-gray-800',
          'to-gray-900',
          'text-white',
          'hover:from-gray-900',
          'hover:to-gray-950',
          'focus-visible:ring-gray-700',
        ];
    }
  }

  private get sizeClasses(): string[] {
    switch (this.size) {
      case 'sm':
        return ['h-9', 'px-4', 'text-sm'];
      case 'lg':
        return ['h-12', 'px-8', 'text-lg'];
      case 'md':
      default:
        return ['h-11', 'px-6'];
    }
  }

}
