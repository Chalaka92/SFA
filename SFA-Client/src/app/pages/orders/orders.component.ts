import { DatePipe } from '@angular/common';
import { Input, OnDestroy, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '@app/common/confirm-dialog/confirm-dialog.component';
import { Order } from '@app/_models/order';
import { SfaService } from '@app/_services/sfa.service';
import { fadeInRightAnimation } from 'src/@sfa/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@sfa/animations/fade-in-up.animation';
import { ListColumn } from 'src/@sfa/shared/list/list-column.model';

@Component({
  selector: 'sfa-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: Order[];

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
      name: 'Completed Date',
      property: 'completedDate',
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
      name: 'Edited Date',
      property: 'editedDate',
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
      name: 'Canceled Date',
      property: 'canceledDate',
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
    {
      name: 'Synced Date',
      property: 'syncedDate',
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
    private snackbar: MatSnackBar,
    private datePipe: DatePipe
  ) {}

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
        // response.forEach((x) => {
        //   x.orderedDate = this.datePipe.transform(x.orderedDate, 'dd-MMM-yyyy');
        // });
        this.orders = response;
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = this.orders;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  ngOnInit() {
    this.getAllOrders();
  }

  deleteOrder(order) {
    this.sfaService._orderService
      .deleteOrder(order.id)
      .subscribe((response) => {
        this.getAllOrders();
        this.snackbar.open('Deletion Successful', 'x', {
          duration: 3000,
          panelClass: 'notif-success',
        });
      });
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
