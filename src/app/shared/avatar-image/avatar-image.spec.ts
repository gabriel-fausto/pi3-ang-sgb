import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarImage } from './avatar-image';

describe('AvatarImage', () => {
  let component: AvatarImage;
  let fixture: ComponentFixture<AvatarImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarImage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarImage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
