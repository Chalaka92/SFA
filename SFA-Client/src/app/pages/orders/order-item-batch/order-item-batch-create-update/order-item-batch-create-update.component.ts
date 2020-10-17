import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemBatch } from '@app/_models/itemBatch';
import { Order } from '@app/_models/order';
import { OrderItemBatch } from '@app/_models/orderItemBatch';
import { SalesRepItemBatch } from '@app/_models/salesRepItemBatch';
import { SfaService } from '@app/_services/sfa.service';

@Component({
  selector: 'sfa-order-item-batch-create-update',
  templateUrl: './order-item-batch-create-update.component.html',
  styleUrls: ['./order-item-batch-create-update.component.scss'],
})
export class OrderItemBatchCreateUpdateComponent implements OnInit {
  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  orders: Order[];
  itemBatches: SalesRepItemBatch[];
  selectedSalesRepItemBatch: SalesRepItemBatch;
  selectedOrder: Order;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<OrderItemBatchCreateUpdateComponent>,
    private fb: FormBuilder,
    private sfaService: SfaService
  ) {
    this.orders = defaults.orders;
    this.itemBatches = defaults.itemBatches;
  }

  ngOnInit(): void {
    if (this.defaults.orderItemBatch) {
      this.mode = 'update';
      this.setSelectedOrder(this.defaults.orderItemBatch.orderId);
    } else {
      this.defaults.orderItemBatch = {} as OrderItemBatch;
    }

    this.form = this.fb.group({
      orderId: [this.defaults.orderItemBatch.orderId || null],
      itemBatchId: [this.defaults.orderItemBatch.itemBatchId || null],
      itemCount: [this.defaults.orderItemBatch.itemCount || null],
      orderItemBatchCode: [
        this.defaults.orderItemBatch.orderItemBatchCode || null,
      ],
      name: [this.defaults.orderItemBatch.name || null],
      sellingToShopOwnerAmount: [
        this.defaults.orderItemBatch.sellingToShopOwnerAmount || null,
      ],
      shopOwnerProfitAmount: [
        this.defaults.orderItemBatch.shopOwnerProfitAmount || null,
      ],
      companyProfitAmount: [
        this.defaults.orderItemBatch.companyProfitAmount || null,
      ],
      companyDiscountRate: [
        this.defaults.orderItemBatch.companyDiscountRate || null,
      ],
      shopOwnerDiscountRate: [
        this.defaults.orderItemBatch.shopOwnerDiscountRate || null,
      ],
      isSpecialDiscountHave: [
        this.defaults.orderItemBatch.isSpecialDiscountHave || false,
      ],
      customerFreeIssueQuantity: [
        this.defaults.orderItemBatch.customerFreeIssueQuantity || null,
      ],
      shopOwnerFreeIssueQuantity: [
        this.defaults.orderItemBatch.shopOwnerFreeIssueQuantity || null,
      ],
    });
    if (this.mode === 'update') {
      this.setSelectedSalesRepItemBatch(
        this.defaults.orderItemBatch.itemBatchId
      );
    }
  }

  getAllItemBatches(userId: any) {
    this.sfaService._salesRepItemBatchService
      .getAllSalesRepItemBatchesByUserId(userId)
      .subscribe((response) => {
        if (response) {
          this.itemBatches = response;
        }
      });
  }

  save() {
    if (this.mode === 'create') {
      this.createOrderItemBatch();
    } else if (this.mode === 'update') {
      this.updateOrderItemBatch();
    }
  }

  createOrderItemBatch() {
    const orderItemBatch = this.form.value;
    this.dialogRef.close(orderItemBatch);
  }

  updateOrderItemBatch() {
    const orderItemBatch = this.form.value;
    orderItemBatch.id = this.defaults.orderItemBatch.id;

    this.dialogRef.close(orderItemBatch);
  }

  setSelectedSalesRepItemBatch(itemBatchId: any) {
    if (this.itemBatches) {
      this.selectedSalesRepItemBatch = this.itemBatches.filter(
        (x) => x.itemBatchId === itemBatchId
      )[0];
    }

    if (this.selectedSalesRepItemBatch) {
      this.form.patchValue({
        name: this.selectedSalesRepItemBatch.itemBatchName,
      });
    }
  }

  setSelectedOrder(orderId: any) {
    this.selectedOrder = this.orders.filter((x) => x.id === orderId)[0];

    this.getAllItemBatches(this.selectedOrder.userId);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
