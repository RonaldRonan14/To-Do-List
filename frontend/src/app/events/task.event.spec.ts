import { TestBed } from '@angular/core/testing';

import { TaskEvent } from './task.event';

describe('TaskEvent', () => {
  let service: TaskEvent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskEvent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
