import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabTaskLayoutComponent } from './tab-task-layout.component';

describe('TabTaskComponent', () => {
  let component: TabTaskLayoutComponent;
  let fixture: ComponentFixture<TabTaskLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabTaskLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabTaskLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
