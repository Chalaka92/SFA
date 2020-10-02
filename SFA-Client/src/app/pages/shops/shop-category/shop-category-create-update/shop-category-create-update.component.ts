import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShopCategory } from '@app/_models/shopCategory';

@Component({
  selector: 'sfa-shop-category-create-update',
  templateUrl: './shop-category-create-update.component.html',
  styleUrls: ['./shop-category-create-update.component.scss'],
})
export class ShopCategoryCreateUpdateComponent implements OnInit {
  form: FormGroup;
  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<ShopCategoryCreateUpdateComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as ShopCategory;
    }

    this.form = this.fb.group({
      name: [this.defaults.name || null],
      description: [this.defaults.description || null],
      shopCategoryCode: [this.defaults.shopCategoryCode || null],
      maximumDebtAmount: [this.defaults.maximumDebtAmount || null],
    });
  }
  save() {
    if (this.mode === 'create') {
      this.createShopCategory();
    } else if (this.mode === 'update') {
      this.updateShopCategory();
    }
  }

  createShopCategory() {
    const shopCategory = this.form.value;
    this.dialogRef.close(shopCategory);
  }

  updateShopCategory() {
    const shopCategory = this.form.value;
    shopCategory.id = this.defaults.id;

    this.dialogRef.close(shopCategory);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
