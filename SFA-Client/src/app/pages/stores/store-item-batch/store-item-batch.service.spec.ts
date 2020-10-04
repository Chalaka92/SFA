/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StoreItemBatchService } from './store-item-batch.service';

describe('Service: StoreItemBatch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreItemBatchService],
    });
  });

  it('should ...', inject(
    [StoreItemBatchService],
    (service: StoreItemBatchService) => {
      expect(service).toBeTruthy();
    }
  ));
});
