import { TestBed } from '@angular/core/testing';

import { UserEvent } from './user.event';

describe('UserEvent', () => {
  let service: UserEvent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserEvent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
