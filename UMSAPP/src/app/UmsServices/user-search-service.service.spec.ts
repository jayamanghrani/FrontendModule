import { TestBed } from '@angular/core/testing';

import { UserSearchServiceService } from './user-search-service.service';

describe('UserSearchServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserSearchServiceService = TestBed.get(UserSearchServiceService);
    expect(service).toBeTruthy();
  });
});
