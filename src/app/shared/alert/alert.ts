import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  LucideAlertTriangle,
  LucideAngularModule,
  LucideCheckCircle,
  LucideIconData,
  LucideInfo,
  LucideXCircle,
} from 'lucide-angular';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './alert.html',
  styleUrl: './alert.css',
})
export class Alert {
  @Input() variant: 'success' | 'error' | 'warning' | 'info' = 'info';
  @Input() className = '';
  @Input() title?: string;

  get classes(): string[] {
    return [
      'flex',
      'gap-3',
      'p-4',
      'rounded-xl',
      'border-2',
      ...this.variantClasses,
      ...this.className.split(' ').filter(Boolean),
    ];
  }

  get icon(): LucideIconData {
    switch (this.variant) {
      case 'success':
        return LucideCheckCircle;
      case 'error':
        return LucideXCircle;
      case 'warning':
        return LucideAlertTriangle;
      case 'info':
      default:
        return LucideInfo;
    }
  }

  private get variantClasses(): string[] {
    switch (this.variant) {
      case 'success':
        return ['bg-gradient-to-r', 'from-green-50', 'to-emerald-50', 'border-green-300', 'text-green-800'];
      case 'error':
        return ['bg-gradient-to-r', 'from-red-50', 'to-rose-50', 'border-red-300', 'text-red-800'];
      case 'warning':
        return ['bg-gradient-to-r', 'from-gray-100', 'to-gray-200', 'border-gray-400', 'text-gray-900'];
      case 'info':
      default:
        return ['bg-gradient-to-r', 'from-gray-100', 'to-gray-200', 'border-gray-400', 'text-gray-900'];
    }
  }

}
