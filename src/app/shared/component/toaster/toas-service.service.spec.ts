import { TestBed } from '@angular/core/testing';

import { ToasServiceService } from './toas-service.service';

describe('ToasServiceService', () => {
  let service: ToasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
