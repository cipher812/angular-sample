import { TestBed } from '@angular/core/testing';

import { ServiceFetchService } from './service-fetch.service';

describe('ServiceFetchService', () => {
  let service: ServiceFetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceFetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
