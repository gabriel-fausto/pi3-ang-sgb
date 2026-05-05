import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionContent } from './accordion-content';

describe('AccordionContent', () => {
  let component: AccordionContent;
  let fixture: ComponentFixture<AccordionContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccordionContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
