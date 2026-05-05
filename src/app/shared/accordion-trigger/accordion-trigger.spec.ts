import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionTrigger } from './accordion-trigger';

describe('AccordionTrigger', () => {
  let component: AccordionTrigger;
  let fixture: ComponentFixture<AccordionTrigger>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionTrigger]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccordionTrigger);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
