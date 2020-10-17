import { Input, OnDestroy, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '@app/common/confirm-dialog/confirm-dialog.component';
import { ItemBatch } from '@app/_models/itemBatch';
import { Order } from '@app/_models/order';
import { OrderItemBatch } from '@app/_models/orderItemBatch';
import { SfaService } from '@app/_services/sfa.service';
import { fadeInRightAnimation } from 'src/@sfa/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@sfa/animations/fade-in-up.animation';
import { ListColumn } from 'src/@sfa/shared/list/list-column.model';
import { OrderItemBatchCreateUpdateComponent } from './order-item-batch-create-update/order-item-batch-create-update.component';

@Component({
  selector: 'sfa-order-item-batch',
  templateUrl: './order-item-batch.component.html',
  styleUrls: ['./order-item-batch.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class OrderItemBatchComponent implements OnInit, OnDestroy {
  orderItemBatches: OrderItemBatch[];
  orders: Order[];
  itemBatches: ItemBatch[];
  displayOrderItemBatches: OrderItemBatch[];
  selectedOrderId: any | 0;

  @Input()
  columns: ListColumn[] = [
    { name: '#Seq', property: 'index', visible: true },
    { name: 'Id', property: 'id', visible: false, isModelProperty: true },
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

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private sfaService: SfaService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAllOrderItemBatches();
    this.getAllOrders();
  }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */

  getAllOrderItemBatches() {
    this.sfaService._orderItemBatchService
      .getAllOrderItemBatches()
      .subscribe((response) => {
        if (response) {
          this.orderItemBatches = response;
          this.displayOrderItemBatches = response;
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = this.displayOrderItemBatches;

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }

  getAllOrders() {
    this.sfaService._orderService.getAllOrders().subscribe((response) => {
      if (response) {
        this.orders = response;
      }
    });
  }

  createOrderItemBatch() {
    const dialogData = { orders: this.orders };
    this.dialog
      .open(OrderItemBatchCreateUpdateComponent, {
        data: dialogData,
      })
      .afterClosed()
      .subscribe((orderItemBatch: OrderItemBatch) => {
        /**
         * Item is the updated item (if the user pressed Save - otherwise it's null)
         */
        if (orderItemBatch) {
          this.sfaService._orderItemBatchService
            .createOrderItemBatch(orderItemBatch)
            .subscribe((response) => {
              this.getAllOrderItemBatches();
              this.snackbar.open('Creation Successful', 'x', {
                duration: 3000,
                panelClass: 'notif-success',
              });
            });
          this.orderItemBatches.unshift(new OrderItemBatch(orderItemBatch));
        }
      });
  }

  updateOrderItemBatch(orderItemBatch) {
    const dialogData = {
      orders: this.orders,
      orderItemBatch: orderItemBatch,
    };
    this.dialog
      .open(OrderItemBatchCreateUpdateComponent, {
        data: dialogData,
      })
      .afterClosed()
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe((orderItemBatch) => {
        /**
         * Item is the updated item (if the user pressed Save - otherwise it's null)
         */
        if (orderItemBatch) {
          this.sfaService._orderItemBatchService
            .updateOrderItemBatch(orderItemBatch.id, orderItemBatch)
            .subscribe((response) => {
              this.getAllOrderItemBatches();
              this.snackbar.open('Update Successful', 'x', {
                duration: 3000,
                panelClass: 'notif-success',
              });
            });
        }
      });
  }

  deleteOrderItemBatch(orderItemBatch) {
    this.sfaService._orderItemBatchService
      .deleteOrderItemBatch(orderItemBatch.id)
      .subscribe((response) => {
        this.getAllOrderItemBatches();
        this.snackbar.open('Deletion Successful', 'x', {
          duration: 3000,
          panelClass: 'notif-success',
        });
      });
  }

  filterByOrderId() {
    if (this.selectedOrderId > 0) {
      this.displayOrderItemBatches = this.orderItemBatches.filter(
        (x) => x.orderId === this.selectedOrderId
      );
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.displayOrderItemBatches;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.displayOrderItemBatches = this.orderItemBatches;
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.displayOrderItemBatches;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  confirmDialog(orderItemBatch): void {
    const message = `Are you sure you want to delete this?`;

    const dialogData = {
      icon: 'delete',
      title: 'Delete',
      message: message,
      icolor: 'warn',
    };

    this.dialog
      .open(ConfirmDialogComponent, {
        maxWidth: '400px',
        data: dialogData,
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          this.deleteOrderItemBatch(orderItemBatch);
        }
      });
  }

  ngOnDestroy() {}
}
