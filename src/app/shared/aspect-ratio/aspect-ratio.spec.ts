import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AspectRatio } from './aspect-ratio';

describe('AspectRatio', () => {
  let component: AspectRatio;
  let fixture: ComponentFixture<AspectRatio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AspectRatio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AspectRatio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
