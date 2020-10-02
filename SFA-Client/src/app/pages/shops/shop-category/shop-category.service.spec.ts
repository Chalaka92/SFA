/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ShopCategoryService } from './shop-category.service';

describe('Service: ShopCategory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopCategoryService]
    });
  });

  it('should ...', inject([ShopCategoryService], (service: ShopCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
