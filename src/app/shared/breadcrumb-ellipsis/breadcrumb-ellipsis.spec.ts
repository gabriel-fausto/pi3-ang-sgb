import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbEllipsis } from './breadcrumb-ellipsis';

describe('BreadcrumbEllipsis', () => {
  let component: BreadcrumbEllipsis;
  let fixture: ComponentFixture<BreadcrumbEllipsis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbEllipsis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreadcrumbEllipsis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
