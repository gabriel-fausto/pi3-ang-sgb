import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbSeparator } from './breadcrumb-separator';

describe('BreadcrumbSeparator', () => {
  let component: BreadcrumbSeparator;
  let fixture: ComponentFixture<BreadcrumbSeparator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbSeparator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreadcrumbSeparator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
