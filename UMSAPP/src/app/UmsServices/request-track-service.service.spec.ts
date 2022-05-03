import { TestBed } from '@angular/core/testing';

import { RequestTrackServiceService } from './request-track-service.service';

describe('RequestTrackServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestTrackServiceService = TestBed.get(RequestTrackServiceService);
    expect(service).toBeTruthy();
  });
});
