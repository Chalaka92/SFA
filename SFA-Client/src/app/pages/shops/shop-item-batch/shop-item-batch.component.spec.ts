import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopItemBatchComponent } from './shop-item-batch.component';

describe('ShopItemBatchComponent', () => {
  let component: ShopItemBatchComponent;
  let fixture: ComponentFixture<ShopItemBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopItemBatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopItemBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
