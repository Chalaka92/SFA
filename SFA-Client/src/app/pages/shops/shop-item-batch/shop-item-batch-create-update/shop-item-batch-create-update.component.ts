import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemBatch } from '@app/_models/itemBatch';
import { Shop } from '@app/_models/shop';
import { ShopItemBatch } from '@app/_models/shopItemBatch';

@Component({
  selector: 'sfa-shop-item-batch-create-update',
  templateUrl: './shop-item-batch-create-update.component.html',
  styleUrls: ['./shop-item-batch-create-update.component.scss'],
})
export class ShopItemBatchCreateUpdateComponent implements OnInit {
  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  shops: Shop[];
  itemBatches: ItemBatch[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<ShopItemBatchCreateUpdateComponent>,
    private fb: FormBuilder
  ) {
    this.shops = defaults.shops;
    this.itemBatches = defaults.itemBatches;
  }

  ngOnInit(): void {
    if (this.defaults.shopItemBatch) {
      this.mode = 'update';
    } else {
      this.defaults.shopItemBatch = {} as ShopItemBatch;
    }

    this.form = this.fb.group({
      shopId: [this.defaults.shopItemBatch.shopId || null],
      itemBatchId: [this.defaults.shopItemBatch.itemBatchId || null],
      itemCount: [this.defaults.shopItemBatch.itemCount || null],
    });
  }
  save() {
    if (this.mode === 'create') {
      this.createShopItemBatch();
    } else if (this.mode === 'update') {
      this.updateShopItemBatch();
    }
  }

  createShopItemBatch() {
    const shopItemBatch = this.form.value;
    this.dialogRef.close(shopItemBatch);
  }

  updateShopItemBatch() {
    const shopItemBatch = this.form.value;
    shopItemBatch.id = this.defaults.shopItemBatch.id;

    this.dialogRef.close(shopItemBatch);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
