import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ItemBatch } from '@app/_models/itemBatch';
import { Order } from '@app/_models/order';
import { OrderItemBatch } from '@app/_models/orderItemBatch';
import { SalesRep } from '@app/_models/salesRep';
import { SalesRepItemBatch } from '@app/_models/salesRepItemBatch';
import { Shop } from '@app/_models/shop';
import { AuthService } from '@app/_services/auth.service';
import { SfaService } from '@app/_services/sfa.service';
import { fadeInRightAnimation } from 'src/@sfa/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@sfa/animations/fade-in-up.animation';
import { ListColumn } from 'src/@sfa/shared/list/list-column.model';

@Component({
  selector: 'sfa-order-create-update',
  templateUrl: './order-create-update.component.html',
  styleUrls: ['./order-create-update.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class OrderCreateUpdateComponent implements OnInit {
  form: FormGroup;

  mode: 'create' | 'update' = 'create';
  salesReps: SalesRep[];
  defaults: Order;
  orderId: number;
  shops: Shop[];
  itemBatches: SalesRepItemBatch[];
  selectedSalesRepItemBatch: SalesRepItemBatch;
  orderItemBatch: OrderItemBatch;
  orderItemBatches: OrderItemBatch[];

  private _gap = 16;
  gap = `${this._gap}px`;

  @Input()
  columns: ListColumn[] = [
    {
      name: 'Name',
      property: 'name',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Item Count',
      property: 'itemCount',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Shop Owner Price',
      property: 'sellingToShopOwnerAmount',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Shop Owner Profit',
      property: 'shopOwnerProfitAmount',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Company Profit',
      property: 'companyProfitAmount',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Shop Owner Discount',
      property: 'shopOwnerDiscountRate',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'CompanyDiscount',
      property: 'companyDiscountRate',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Special Discount',
      property: 'isSpecialDiscountHave',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Custom Free Issue',
      property: 'customerFreeIssueQuantity',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Shop Owner Free Issue',
      property: 'shopOwnerFreeIssueQuantity',
      visible: true,
      isModelProperty: true,
    },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  dataSource: MatTableDataSource<OrderItemBatch> | null;

  constructor(
    private fb: FormBuilder,
    private sfaService: SfaService,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getAllShops();
    this.getAllSalesReps();

    this.activatedRoute.params.subscribe((params) => {
      this.orderId = params['orderId'];
      if (this.orderId) {
        this.getSingleOrder(this.orderId);
        this.mode = 'update';
      } else {
        this.defaults = {} as Order;
        this.orderItemBatch = {} as OrderItemBatch;
        this.buildForm();
      }
    });
    this.orderItemBatches = [];
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  buildForm() {
    const orderItemFormGroup = this.fb.group({
      itemBatchId: this.fb.control(this.orderItemBatch.itemBatchId || 0),
      name: this.fb.control(this.orderItemBatch.name),
      itemCount: this.fb.control(this.orderItemBatch.itemCount),
      sellingToShopOwnerAmount: this.fb.control(
        this.orderItemBatch.sellingToShopOwnerAmount
      ),
      shopOwnerProfitAmount: this.fb.control(
        this.orderItemBatch.shopOwnerProfitAmount
      ),
      companyProfitAmount: this.fb.control(
        this.orderItemBatch.companyProfitAmount
      ),
      companyDiscountRate: this.fb.control(
        this.orderItemBatch.companyDiscountRate
      ),
      shopOwnerDiscountRate: this.fb.control(
        this.orderItemBatch.shopOwnerDiscountRate
      ),
      isSpecialDiscountHave: this.fb.control(
        this.orderItemBatch.isSpecialDiscountHave
      ),
      customerFreeIssueQuantity: this.fb.control(
        this.orderItemBatch.customerFreeIssueQuantity
      ),
      shopOwnerFreeIssueQuantity: this.fb.control(
        this.orderItemBatch.shopOwnerFreeIssueQuantity
      ),
    });

    this.form = this.fb.group({
      shopId: [this.defaults.shopId || null],
      salesRepId: [this.defaults.salesRepId || null],
      orderCode: [this.defaults.orderCode || null],
      totalAmount: [this.defaults.totalAmount || 0],
      orderItemBatch: orderItemFormGroup,
    });

    this.removeValidator(this.form.get('orderItemBatch'));
  }

  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${
      this._gap - this._gap / colAmount
    }px)`;
  }

  save() {
    if (this.mode === 'create') {
      this.createOrder();
    } else if (this.mode === 'update') {
      this.updateOrder();
    }
  }

  createOrder() {
    const order: Order = this.form.value;
    order.orderedDate = new Date();
    order.loginEmail = this.authService.currentUserValue.email;
    order.orderItemBatches = this.orderItemBatches;
    order.isSync = true;
    order.syncedDate = new Date();

    if (order) {
      this.sfaService._orderService.createOrder(order).subscribe(
        () => {
          this.snackbar.open('Order Creation Successful.', 'x', {
            duration: 3000,
            panelClass: 'notif-success',
          });
        },
        (error) => {
          console.log(error);
          this.snackbar.open('Order Creation Failed.', 'x', {
            duration: 3000,
            panelClass: 'notif-error',
          });
        }
      );
    }
  }

  updateOrder() {
    const order: Order = this.form.value;
    order.id = this.orderId;
    order.isEdit = true;
    order.editedDate = new Date();
    order.loginEmail = this.authService.currentUserValue.email;

    if (order) {
      this.sfaService._orderService.updateOrder(order.id, order).subscribe(
        () => {
          this.snackbar.open('Update Successful.', 'x', {
            duration: 3000,
            panelClass: 'notif-success',
          });
        },
        () => {
          this.snackbar.open('Update Failed.', 'x', {
            duration: 3000,
            panelClass: 'notif-error',
          });
        }
      );
    }
  }

  getSingleOrder(orderId: number) {
    this.sfaService._orderService
      .getSingleOrder(orderId)
      .subscribe((response) => {
        if (response) {
          this.defaults = response;
          this.buildForm();
        }
      });
  }

  getAllShops() {
    this.sfaService._shopService.getAllShops().subscribe((response) => {
      if (response) {
        this.shops = response;
      }
    });
  }

  getAllSalesReps() {
    this.sfaService._salesRepService.getAllSalesReps().subscribe((response) => {
      if (response) {
        this.salesReps = response;
      }
    });
  }

  getAllItemBatches(salesRepId: any) {
    this.sfaService._salesRepItemBatchService
      .getAllSalesRepItemBatchesBySalesRepId(salesRepId)
      .subscribe((response) => {
        if (response) {
          this.itemBatches = response;
        }
      });
  }

  AddOrderItemBatch(orderItemBatch: any) {
    this.orderItemBatches.push(orderItemBatch);
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.orderItemBatches;

    const totalAmount =
      this.form.value.totalAmount +
      orderItemBatch.sellingToShopOwnerAmount * orderItemBatch.itemCount;

    this.form.patchValue({
      totalAmount: totalAmount,
    });
  }

  removeOrderItemBatch(rowIndex: any, row: any) {
    this.orderItemBatches.splice(rowIndex, 1);
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.orderItemBatches;

    const totalAmount =
      this.form.value.totalAmount -
      row.sellingToShopOwnerAmount * row.itemCount;

    this.form.patchValue({
      totalAmount: totalAmount,
    });
  }

  setSelectedSalesRepItemBatch(itemBatchId: any) {
    this.selectedSalesRepItemBatch = this.itemBatches.filter(
      (x) => x.itemBatchId === itemBatchId
    )[0];

    this.form.patchValue({
      orderItemBatch: { name: this.selectedSalesRepItemBatch.itemBatchName },
    });
  }

  removeValidator(form: any) {
    // tslint:disable-next-line: forin
    for (const field in form.controls) {
      // 'field' is a string
      const con = form.get(field);
      // 'control' is a FormControl
      con.clearValidators();
      con.updateValueAndValidity();
    }
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
