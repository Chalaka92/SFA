import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemBatch } from '@app/_models/itemBatch';
import { Store } from '@app/_models/store';
import { StoreItemBatch } from '@app/_models/storeItemBatch';

@Component({
  selector: 'sfa-store-item-batch-create-update',
  templateUrl: './store-item-batch-create-update.component.html',
  styleUrls: ['./store-item-batch-create-update.component.scss'],
})
export class StoreItemBatchCreateUpdateComponent implements OnInit {
  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  stores: Store[];
  itemBatches: ItemBatch[];
  selectedItemBatch: ItemBatch;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<StoreItemBatchCreateUpdateComponent>,
    private fb: FormBuilder
  ) {
    this.stores = defaults.stores;
    this.itemBatches = defaults.itemBatches;
  }

  ngOnInit(): void {
    if (this.defaults.storeItemBatch) {
      this.mode = 'update';
      this.setSelectedItemBatch(this.defaults.storeItemBatch.itemBatchId);
    } else {
      this.defaults.storeItemBatch = {} as StoreItemBatch;
    }

    this.form = this.fb.group({
      storeId: [this.defaults.storeItemBatch.storeId || null],
      itemBatchId: [this.defaults.storeItemBatch.itemBatchId || null],
      itemCount: [this.defaults.storeItemBatch.itemCount || null],
    });
  }

  save() {
    if (this.mode === 'create') {
      this.createStoreItemBatch();
    } else if (this.mode === 'update') {
      this.updateStoreItemBatch();
    }
  }

  createStoreItemBatch() {
    const storeItemBatch = this.form.value;
    this.dialogRef.close(storeItemBatch);
  }

  updateStoreItemBatch() {
    const storeItemBatch = this.form.value;
    storeItemBatch.id = this.defaults.storeItemBatch.id;

    this.dialogRef.close(storeItemBatch);
  }

  setSelectedItemBatch(itemBatchId: any) {
    this.selectedItemBatch = this.itemBatches.filter(
      (x) => x.id === itemBatchId
    )[0];
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
