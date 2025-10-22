import { TestBed } from '@angular/core/testing';

import { PagesEvent } from './pages.event';

describe('PageChangeEvent', () => {
  let service: PagesEvent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagesEvent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
