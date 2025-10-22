import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputProfilePhotoComponent } from './input-profile-photo.component';

describe('InputProfilePhotoComponent', () => {
  let component: InputProfilePhotoComponent;
  let fixture: ComponentFixture<InputProfilePhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputProfilePhotoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputProfilePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
