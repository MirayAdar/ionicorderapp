import { TestBed } from '@angular/core/testing';

import { GidService } from './gid.service';

describe('GidService', () => {
  let service: GidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
