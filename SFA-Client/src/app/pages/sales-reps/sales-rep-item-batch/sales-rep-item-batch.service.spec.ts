/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SalesRepItemBatchService } from './sales-rep-item-batch.service';

describe('Service: StoreItemBatch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalesRepItemBatchService],
    });
  });

  it('should ...', inject(
    [SalesRepItemBatchService],
    (service: SalesRepItemBatchService) => {
      expect(service).toBeTruthy();
    }
  ));
});
