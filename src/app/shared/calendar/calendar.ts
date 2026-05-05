import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

type CalendarMode = 'single' | 'range';

interface CalendarDay {
  date: Date;
  label: number;
  outside: boolean;
  disabled: boolean;
  hidden: boolean;
}

interface CalendarClassNames {
  months?: string;
  month?: string;
  caption?: string;
  caption_label?: string;
  nav?: string;
  nav_button?: string;
  nav_button_previous?: string;
  nav_button_next?: string;
  table?: string;
  head_row?: string;
  head_cell?: string;
  row?: string;
  cell?: string;
  day?: string;
  day_range_start?: string;
  day_range_end?: string;
  day_selected?: string;
  day_today?: string;
  day_outside?: string;
  day_disabled?: string;
  day_range_middle?: string;
  day_hidden?: string;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar implements OnInit {
  @Input() className = '';
  @Input() classNames: CalendarClassNames = {};
  @Input() showOutsideDays = true;
  @Input() mode: CalendarMode = 'single';
  @Input() month?: Date;
  @Input() selected?: Date | [Date | null, Date | null] | null;

  @Output() selectedChange = new EventEmitter<Date | [Date | null, Date | null] | null>();
  @Output() monthChange = new EventEmitter<Date>();

  readonly weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  displayMonth = new Date();
  weeks: CalendarDay[][] = [];

  ngOnInit(): void {
    this.displayMonth = this.month ? new Date(this.month) : this.startOfMonth(new Date());
    this.syncMonth();
  }

  get rootClasses(): string[] {
    return ['p-3', ...this.className.split(' ').filter(Boolean)];
  }

  get monthsClasses(): string[] {
    return this.composeClasses('months', 'flex flex-col sm:flex-row gap-2');
  }

  get monthClasses(): string[] {
    return this.composeClasses('month', 'flex flex-col gap-4');
  }

  get captionClasses(): string[] {
    return this.composeClasses('caption', 'flex justify-center pt-1 relative items-center w-full');
  }

  get captionLabelClasses(): string[] {
    return this.composeClasses('caption_label', 'text-sm font-medium');
  }

  get navClasses(): string[] {
    return this.composeClasses('nav', 'flex items-center gap-1');
  }

  get navButtonClasses(): string[] {
    return [
      ...this.buttonVariant('outline'),
      ...'size-7 bg-transparent p-0 opacity-50 hover:opacity-100'.split(' '),
      ...this.extraClasses('nav_button'),
    ];
  }

  get previousNavButtonClasses(): string[] {
    return this.navButtonClasses.concat(this.extraClasses('nav_button_previous', 'absolute left-1'));
  }

  get nextNavButtonClasses(): string[] {
    return this.navButtonClasses.concat(this.extraClasses('nav_button_next', 'absolute right-1'));
  }

  get tableClasses(): string[] {
    return this.composeClasses('table', 'w-full border-collapse space-x-1');
  }

  get headRowClasses(): string[] {
    return this.composeClasses('head_row', 'flex');
  }

  get headCellClasses(): string[] {
    return this.composeClasses('head_cell', 'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]');
  }

  get rowClasses(): string[] {
    return this.composeClasses('row', 'flex w-full mt-2');
  }

  get monthLabel(): string {
    return this.displayMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  previousMonth(): void {
    this.displayMonth = new Date(this.displayMonth.getFullYear(), this.displayMonth.getMonth() - 1, 1);
    this.syncMonth();
  }

  nextMonth(): void {
    this.displayMonth = new Date(this.displayMonth.getFullYear(), this.displayMonth.getMonth() + 1, 1);
    this.syncMonth();
  }

  selectDay(day: CalendarDay): void {
    if (day.disabled || day.hidden) {
      return;
    }

    if (this.mode === 'range') {
      const currentRange = Array.isArray(this.selected) ? this.selected : [null, null] as [Date | null, Date | null];
      const [start, end] = currentRange;

      if (!start || (start && end)) {
        this.selected = [day.date, null];
      } else if (this.isSameDay(day.date, start) || day.date < start) {
        this.selected = [day.date, start];
      } else {
        this.selected = [start, day.date];
      }

      this.selectedChange.emit(this.selected);
      return;
    }

    this.selected = day.date;
    this.selectedChange.emit(this.selected);
  }

  getCellClasses(day: CalendarDay): string[] {
    const base =
      this.mode === 'range'
        ? 'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
        : 'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected])]:rounded-md';

    return [...base.split(' '), ...this.extraClasses('cell')];
  }

  getDayClasses(day: CalendarDay): string[] {
    const classes = [
      ...this.buttonVariant('ghost'),
      ...'size-8 p-0 font-normal aria-selected:opacity-100'.split(' '),
      ...this.extraClasses('day'),
    ];

    if (this.isRangeStart(day.date)) {
      classes.push(...this.extraClasses('day_range_start', 'day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground'));
    }

    if (this.isRangeEnd(day.date)) {
      classes.push(...this.extraClasses('day_range_end', 'day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground'));
    }

    if (this.isSelected(day.date)) {
      classes.push(...this.extraClasses('day_selected', 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground'));
    }

    if (this.isToday(day.date)) {
      classes.push(...this.extraClasses('day_today', 'bg-accent text-accent-foreground'));
    }

    if (day.outside) {
      classes.push(...this.extraClasses('day_outside', 'day-outside text-muted-foreground aria-selected:text-muted-foreground'));
    }

    if (day.disabled) {
      classes.push(...this.extraClasses('day_disabled', 'text-muted-foreground opacity-50'));
    }

    if (this.isRangeMiddle(day.date)) {
      classes.push(...this.extraClasses('day_range_middle', 'aria-selected:bg-accent aria-selected:text-accent-foreground'));
    }

    if (day.hidden) {
      classes.push(...this.extraClasses('day_hidden', 'invisible'));
    }

    return classes;
  }

  isSelected(date: Date): boolean {
    if (this.mode === 'range') {
      return this.isRangeStart(date) || this.isRangeEnd(date) || this.isRangeMiddle(date);
    }

    return this.selected instanceof Date && this.isSameDay(this.selected, date);
  }

  isRangeStart(date: Date): boolean {
    return Array.isArray(this.selected) && !!this.selected[0] && this.isSameDay(this.selected[0], date);
  }

  isRangeEnd(date: Date): boolean {
    return Array.isArray(this.selected) && !!this.selected[1] && this.isSameDay(this.selected[1], date);
  }

  isRangeMiddle(date: Date): boolean {
    if (!Array.isArray(this.selected) || !this.selected[0] || !this.selected[1]) {
      return false;
    }

    const [start, end] = this.selected;
    const normalizedDate = this.stripTime(date);
    return !!start && !!end && normalizedDate > this.stripTime(start) && normalizedDate < this.stripTime(end);
  }

  isToday(date: Date): boolean {
    return this.isSameDay(date, new Date());
  }

  private syncMonth(): void {
    this.displayMonth = this.startOfMonth(this.displayMonth);
    this.weeks = this.buildWeeks(this.displayMonth);
    this.monthChange.emit(new Date(this.displayMonth));
  }

  private buildWeeks(month: Date): CalendarDay[][] {
    const firstDay = this.startOfMonth(month);
    const firstGridDay = new Date(firstDay);
    firstGridDay.setDate(firstGridDay.getDate() - firstGridDay.getDay());

    const weeks: CalendarDay[][] = [];

    for (let weekIndex = 0; weekIndex < 6; weekIndex += 1) {
      const week: CalendarDay[] = [];

      for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
        const date = new Date(firstGridDay);
        date.setDate(firstGridDay.getDate() + weekIndex * 7 + dayIndex);

        const outside = date.getMonth() !== month.getMonth();
        week.push({
          date,
          label: date.getDate(),
          outside,
          disabled: false,
          hidden: outside && !this.showOutsideDays,
        });
      }

      weeks.push(week);
    }

    return weeks;
  }

  private startOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  private stripTime(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  }

  private isSameDay(left: Date, right: Date): boolean {
    return this.stripTime(left) === this.stripTime(right);
  }

  private composeClasses(key: keyof CalendarClassNames, defaults: string): string[] {
    return [...defaults.split(' '), ...this.extraClasses(key)];
  }

  private extraClasses(key: keyof CalendarClassNames, fallback = ''): string[] {
    const source = this.classNames[key] ?? fallback;
    return source.split(' ').filter(Boolean);
  }

  private buttonVariant(variant: 'outline' | 'ghost'): string[] {
    const shared = [
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
    ];

    if (variant === 'outline') {
      return [
        ...shared,
        'border-2',
        'border-gray-300',
        'bg-white',
        'text-gray-700',
        'hover:bg-gray-50',
        'focus-visible:ring-gray-500',
      ];
    }

    return [...shared, 'hover:bg-gray-100', 'text-gray-700', 'focus-visible:ring-gray-500'];
  }

}
