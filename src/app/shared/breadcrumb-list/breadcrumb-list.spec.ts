import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbList } from './breadcrumb-list';

describe('BreadcrumbList', () => {
  let component: BreadcrumbList;
  let fixture: ComponentFixture<BreadcrumbList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreadcrumbList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
