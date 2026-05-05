import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHead } from './table-head';

describe('TableHead', () => {
  let component: TableHead;
  let fixture: ComponentFixture<TableHead>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableHead]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableHead);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
