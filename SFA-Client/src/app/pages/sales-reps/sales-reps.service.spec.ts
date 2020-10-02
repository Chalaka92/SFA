/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SalesRepsService } from './sales-reps.service';

describe('Service: SalesReps', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalesRepsService]
    });
  });

  it('should ...', inject([SalesRepsService], (service: SalesRepsService) => {
    expect(service).toBeTruthy();
  }));
});
