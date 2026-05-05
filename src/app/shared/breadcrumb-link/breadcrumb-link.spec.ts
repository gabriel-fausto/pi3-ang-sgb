import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbLink } from './breadcrumb-link';

describe('BreadcrumbLink', () => {
  let component: BreadcrumbLink;
  let fixture: ComponentFixture<BreadcrumbLink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbLink]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreadcrumbLink);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
