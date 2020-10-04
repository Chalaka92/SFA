import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemBatch } from '@app/_models/itemBatch';
import { SalesRep } from '@app/_models/salesRep';
import { SalesRepItemBatch } from '@app/_models/salesRepItemBatch';
import { Store } from '@app/_models/store';
import { StoreItemBatch } from '@app/_models/storeItemBatch';
import { SfaService } from '@app/_services/sfa.service';

@Component({
  selector: 'sfa-sales-rep-item-batch-create-update',
  templateUrl: './sales-rep-item-batch-create-update.component.html',
  styleUrls: ['./sales-rep-item-batch-create-update.component.scss'],
})
export class SalesRepItemBatchCreateUpdateComponent implements OnInit {
  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  salesReps: SalesRep[];
  itemBatches: ItemBatch[];
  salesRepStores: SalesRep[];
  storeItemBatches: StoreItemBatch[];
  selectedStore: Store;
  selectedItemBatch: StoreItemBatch;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<SalesRepItemBatchCreateUpdateComponent>,
    private fb: FormBuilder,
    private sfaService: SfaService
  ) {
    this.salesReps = defaults.salesReps;
    this.itemBatches = defaults.itemBatches;
  }

  ngOnInit(): void {
    if (this.defaults.salesRepItemBatch) {
      this.mode = 'update';
      this.setSelectedSalesRep(this.defaults.salesRepItemBatch.salesRepId);
      this.getAllStoreItemBatchesByStoreId(
        this.defaults.salesRepItemBatch.storeId
      );
    } else {
      this.defaults.salesRepItemBatch = {} as SalesRepItemBatch;
    }

    this.form = this.fb.group({
      salesRepId: [this.defaults.salesRepItemBatch.salesRepId || null],
      itemBatchId: [this.defaults.salesRepItemBatch.itemBatchId || null],
      itemCount: [this.defaults.salesRepItemBatch.itemCount || null],
      storeId: [this.defaults.salesRepItemBatch.storeId || null],
    });
  }

  getAllStoreItemBatchesByStoreId(storeId: any) {
    this.sfaService._storeItemBatchService
      .getAllStoreItemBatchesByStoreId(storeId)
      .subscribe((response) => {
        if (response) {
          this.storeItemBatches = response;
          this.setSelectedItemBatch(
            this.defaults.salesRepItemBatch.itemBatchId
          );
        }
      });
  }

  save() {
    if (this.mode === 'create') {
      this.createSalesRepItemBatch();
    } else if (this.mode === 'update') {
      this.updateSalesRepItemBatch();
    }
  }

  createSalesRepItemBatch() {
    const salesRepItemBatch = this.form.value;
    this.dialogRef.close(salesRepItemBatch);
  }

  updateSalesRepItemBatch() {
    const salesRepItemBatch = this.form.value;
    salesRepItemBatch.id = this.defaults.salesRepItemBatch.id;

    this.dialogRef.close(salesRepItemBatch);
  }

  setSelectedStore(storeId: any) {
    this.getAllStoreItemBatchesByStoreId(storeId);
  }

  setSelectedItemBatch(itemBatchId: any) {
    this.selectedItemBatch = this.storeItemBatches.filter(
      (x) => x.itemBatchId === itemBatchId
    )[0];
  }

  setSelectedSalesRep(salesRepId: any) {
    this.sfaService._salesRepService
      .getAllSalesRepsDetailsBySalesRepId(salesRepId)
      .subscribe((response) => {
        if (response) {
          this.salesRepStores = response;
        }
      });
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
