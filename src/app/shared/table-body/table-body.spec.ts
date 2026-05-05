import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBody } from './table-body';

describe('TableBody', () => {
  let component: TableBody;
  let fixture: ComponentFixture<TableBody>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableBody]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableBody);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
