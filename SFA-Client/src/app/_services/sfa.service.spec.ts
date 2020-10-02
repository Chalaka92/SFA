/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SfaService } from './sfa.service';

describe('Service: User', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SfaService],
    });
  });

  it('should ...', inject([SfaService], (service: SfaService) => {
    expect(service).toBeTruthy();
  }));
});
