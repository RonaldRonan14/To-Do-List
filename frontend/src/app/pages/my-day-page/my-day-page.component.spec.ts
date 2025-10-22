import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDayPage } from './my-day-page.component';

describe('MyDayPage', () => {
  let component: MyDayPage;
  let fixture: ComponentFixture<MyDayPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDayPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyDayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
