import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { Accordion } from './accordion';
import { AccordionItem } from '../accordion-item/accordion-item';
import { AccordionTrigger } from '../accordion-trigger/accordion-trigger';
import { AccordionContent } from '../accordion-content/accordion-content';

describe('Accordion', () => {
  let component: Accordion;
  let fixture: ComponentFixture<Accordion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Accordion]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Accordion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  standalone: true,
  imports: [Accordion, AccordionItem, AccordionTrigger, AccordionContent],
  template: `
    <app-accordion [type]="type" [collapsible]="collapsible" [(value)]="value">
      <app-accordion-item value="item-1">
        <app-accordion-trigger>Item 1</app-accordion-trigger>
        <app-accordion-content>Content 1</app-accordion-content>
      </app-accordion-item>
      <app-accordion-item value="item-2">
        <app-accordion-trigger>Item 2</app-accordion-trigger>
        <app-accordion-content>Content 2</app-accordion-content>
      </app-accordion-item>
    </app-accordion>
  `,
})
class AccordionHostComponent {
  type: 'single' | 'multiple' = 'single';
  collapsible = false;
  value: string | string[] | undefined;
}

describe('Accordion contract', () => {
  let fixture: ComponentFixture<AccordionHostComponent>;
  let host: AccordionHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('opens one item at a time in single mode', () => {
    const buttons = Array.from(fixture.nativeElement.querySelectorAll('button')) as HTMLButtonElement[];

    buttons[0].click();
    fixture.detectChanges();
    expect(host.value).toBe('item-1');

    buttons[1].click();
    fixture.detectChanges();
    expect(host.value).toBe('item-2');
  });

  it('keeps multiple items open in multiple mode', () => {
    host.type = 'multiple';
    host.value = [];
    fixture.detectChanges();

    const buttons = Array.from(fixture.nativeElement.querySelectorAll('button')) as HTMLButtonElement[];

    buttons[0].click();
    fixture.detectChanges();
    buttons[1].click();
    fixture.detectChanges();

    expect(host.value).toEqual(['item-1', 'item-2']);
  });

  it('allows closing the open item when collapsible is enabled', () => {
    host.collapsible = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    button.click();
    fixture.detectChanges();
    expect(host.value).toBe('item-1');

    button.click();
    fixture.detectChanges();
    expect(host.value).toBeUndefined();
  });
});
