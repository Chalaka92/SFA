import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreItemBatchComponent } from './store-item-batch.component';

describe('StoreItemBatchComponent', () => {
  let component: StoreItemBatchComponent;
  let fixture: ComponentFixture<StoreItemBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreItemBatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreItemBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
