import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarFallback } from './avatar-fallback';

describe('AvatarFallback', () => {
  let component: AvatarFallback;
  let fixture: ComponentFixture<AvatarFallback>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarFallback]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarFallback);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
