import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '@app/common/confirm-dialog/confirm-dialog.component';
import { Order } from '@app/_models/order';
import { Shop } from '@app/_models/shop';
import { SfaService } from '@app/_services/sfa.service';
import { fadeInRightAnimation } from 'src/@sfa/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@sfa/animations/fade-in-up.animation';
import { ListColumn } from 'src/@sfa/shared/list/list-column.model';

@Component({
  selector: 'sfa-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class OrderComponent implements OnInit, OnDestroy {
  orders: Order[];
  selectedShopId: any | 0;
  displayOrders: Order[];
  shops: Shop[];

  @Input()
  columns: ListColumn[] = [
    { name: '#Seq', property: 'index', visible: true },
    {
      name: 'Id',
      property: 'id',
      visible: false,
      isModelProperty: true,
      isList: false,
    },
    {
      name: 'Order Code',
      property: 'orderCode',
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: 'Shop',
      property: 'shopName',
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: 'Sales Rep',
      property: 'salesRepName',
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: 'Total Amount',
      property: 'totalAmount',
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: 'Ordered Date',
      property: 'orderedDate',
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: 'IsComplete',
      property: 'isComplete',
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: 'IsEdit',
      property: 'isEdit',
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: 'Edited By',
      property: 'editedUserId',
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: 'IsCancel',
      property: 'isCancel',
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: 'Cancel By',
      property: 'canceledUserId',
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: 'IsSync',
      property: 'isSync',
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  dataSource: MatTableDataSource<Order> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private sfaService: SfaService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAllOrders();
    this.getAllShops();
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
  getAllOrders() {
    this.sfaService._orderService.getAllOrders().subscribe((response) => {
      if (response) {
        this.orders = response;
        this.displayOrders = response;
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = this.displayOrders;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

  deleteOrder(order) {
    this.sfaService._orderService.deleteOrder(order.id).subscribe(
      () => {
        this.getAllOrders();
        this.snackbar.open('Deletion Successful', 'x', {
          duration: 3000,
          panelClass: 'notif-success',
        });
      },
      () => {
        this.snackbar.open('Deletion Failed', 'x', {
          duration: 3000,
          panelClass: 'notif-error',
        });
      }
    );
  }

  filterByShopId() {
    if (this.selectedShopId > 0) {
      this.displayOrders = this.orders.filter(
        (x) => x.shopId === this.selectedShopId
      );
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.displayOrders;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.displayOrders = this.orders;
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.displayOrders;

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

  confirmDialog(order): void {
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
          this.deleteOrder(order);
        }
      });
  }

  ngOnDestroy() {}
}
