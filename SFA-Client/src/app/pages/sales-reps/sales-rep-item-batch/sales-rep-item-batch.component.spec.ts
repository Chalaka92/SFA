import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesRepItemBatchComponent } from './sales-rep-item-batch.component';

describe('SalesRepItemBatchComponent', () => {
  let component: SalesRepItemBatchComponent;
  let fixture: ComponentFixture<SalesRepItemBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesRepItemBatchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesRepItemBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
