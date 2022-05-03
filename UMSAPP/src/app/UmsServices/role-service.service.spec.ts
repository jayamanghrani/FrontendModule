import { TestBed } from '@angular/core/testing';

import { RoleServiceService } from './role-service.service';

describe('RoleServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoleServiceService = TestBed.get(RoleServiceService);
    expect(service).toBeTruthy();
  });
});
