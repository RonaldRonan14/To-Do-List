import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTaskComponent } from './section-task.component';

describe('SectionTaskComponent', () => {
  let component: SectionTaskComponent;
  let fixture: ComponentFixture<SectionTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
