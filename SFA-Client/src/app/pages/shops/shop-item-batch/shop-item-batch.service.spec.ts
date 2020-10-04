/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ShopItemBatchService } from './shop-item-batch.service';

describe('Service: ShopItemBatch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopItemBatchService]
    });
  });

  it('should ...', inject([ShopItemBatchService], (service: ShopItemBatchService) => {
    expect(service).toBeTruthy();
  }));
});
