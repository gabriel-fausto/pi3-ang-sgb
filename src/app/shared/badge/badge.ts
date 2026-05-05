import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.html',
  styleUrl: './badge.css',
})
export class Badge {
  @Input() variant: 'default' | 'success' | 'error' | 'warning' | 'info' = 'default';
  @Input() className = '';

  get classes(): string[] {
    return [
      'inline-flex',
      'items-center',
      'px-3',
      'py-1',
      'rounded-full',
      'text-xs',
      'font-semibold',
      'transition-all',
      ...this.variantClasses,
      ...this.className.split(' ').filter(Boolean),
    ];
  }

  private get variantClasses(): string[] {
    switch (this.variant) {
      case 'success':
        return ['bg-green-100', 'text-green-700', 'border', 'border-green-200'];
      case 'error':
        return ['bg-red-100', 'text-red-700', 'border', 'border-red-200'];
      case 'warning':
        return ['bg-gray-200', 'text-gray-800', 'border', 'border-gray-300'];
      case 'info':
        return ['bg-gray-200', 'text-gray-800', 'border', 'border-gray-300'];
      case 'default':
      default:
        return ['bg-gray-100', 'text-gray-700', 'border', 'border-gray-200'];
    }
  }

}
