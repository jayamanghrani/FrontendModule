import { TestBed } from '@angular/core/testing';

import { UploadExcelServiceService } from './upload-excel-service.service';

describe('UploadExcelServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadExcelServiceService = TestBed.get(UploadExcelServiceService);
    expect(service).toBeTruthy();
  });
});
