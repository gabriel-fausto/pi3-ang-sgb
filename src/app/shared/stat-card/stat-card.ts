import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';
import { Card } from '../card/card';
import { CardContent } from '../card-content/card-content';
import { CardHeader } from '../card-header/card-header';
import { CardTitle } from '../card-title/card-title';

interface StatCardTrend {
  value: number;
  isPositive: boolean;
}

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, Card, CardContent, CardHeader, CardTitle],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.css',
})
export class StatCard {
  @Input() title = '';
  @Input() value: string | number = '';
  @Input() description?: string;
  @Input() icon?: LucideIconData;
  @Input() iconColor = 'text-primary';
  @Input() trend?: StatCardTrend;

  get trendClasses(): string[] {
    return [
      'flex',
      'items-center',
      'gap-1',
      'text-sm',
      'font-semibold',
      'px-3',
      'py-1',
      'rounded-full',
      ...(this.trend?.isPositive ? ['bg-green-100', 'text-green-700'] : ['bg-red-100', 'text-red-700']),
    ];
  }

  get trendSymbol(): string {
    return this.trend?.isPositive ? '↑' : '↓';
  }

  get trendValue(): number {
    return Math.abs(this.trend?.value ?? 0);
  }

}
