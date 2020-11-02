import { Input, OnDestroy, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '@app/common/confirm-dialog/confirm-dialog.component';
import { ItemBatch } from '@app/_models/itemBatch';
import { SalesRep } from '@app/_models/salesRep';
import { SalesRepGroupByUserId } from '@app/_models/salesRepGroupByUserId';
import { SalesRepItemBatch } from '@app/_models/salesRepItemBatch';
import { SfaService } from '@app/_services/sfa.service';
import { fadeInRightAnimation } from 'src/@sfa/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@sfa/animations/fade-in-up.animation';
import { ListColumn } from 'src/@sfa/shared/list/list-column.model';
import { SalesRepItemBatchCreateUpdateComponent } from './sales-rep-item-batch-create-update/sales-rep-item-batch-create-update.component';

@Component({
  selector: 'sfa-sales-rep-item-batch',
  templateUrl: './sales-rep-item-batch.component.html',
  styleUrls: ['./sales-rep-item-batch.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class SalesRepItemBatchComponent implements OnInit, OnDestroy {
  salesRepItemBatches: SalesRepItemBatch[];
  salesRepsGroupByUserId: SalesRepGroupByUserId[];
  displaySalesRepItemBatches: SalesRepItemBatch[];
  selectedSalesRepId: any | 0;

  @Input()
  columns: ListColumn[] = [
    { name: '#Seq', property: 'index', visible: true },
    { name: 'Id', property: 'id', visible: false, isModelProperty: true },
    {
      name: 'SalesRep',
      property: 'salesRepName',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Item Batch',
      property: 'itemBatchName',
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
      name: 'Store',
      property: 'storeName',
      visible: true,
      isModelProperty: true,
    },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  dataSource: MatTableDataSource<SalesRepItemBatch> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private sfaService: SfaService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAllSalesRepItemBatches();
    this.getAllSalesReps();
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

  getAllSalesRepItemBatches() {
    this.sfaService._salesRepItemBatchService
      .getAllSalesRepItemBatches()
      .subscribe((response) => {
        if (response) {
          this.salesRepItemBatches = response;
          this.displaySalesRepItemBatches = response;
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = this.displaySalesRepItemBatches;

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }

  getAllSalesReps() {
    this.sfaService._salesRepService
      .getAllSalesRepsGroupByUserId()
      .subscribe((response) => {
        if (response) {
          this.salesRepsGroupByUserId = response;
        }
      });
  }

  createSalesRepItemBatch() {
    const dialogData = {
      salesRepsGroupByUserId: this.salesRepsGroupByUserId,
    };
    this.dialog
      .open(SalesRepItemBatchCreateUpdateComponent, {
        data: dialogData,
      })
      .afterClosed()
      .subscribe(
        (salesRepItemBatch: SalesRepItemBatch) => {
          if (
            this.salesRepItemBatches.filter(
              (x) =>
                x.itemBatchId === salesRepItemBatch.itemBatchId &&
                x.userId === salesRepItemBatch.userId
            ).length > 0
          ) {
            this.snackbar.open('Record already exist.', 'x', {
              duration: 3000,
              panelClass: 'notif-error',
            });
          } else {
            if (salesRepItemBatch) {
              this.sfaService._salesRepItemBatchService
                .createSalesRepItemBatch(salesRepItemBatch)
                .subscribe((response) => {
                  this.getAllSalesRepItemBatches();
                  this.snackbar.open('Creation Successful', 'x', {
                    duration: 3000,
                    panelClass: 'notif-success',
                  });
                });
              this.salesRepItemBatches.unshift(
                new SalesRepItemBatch(salesRepItemBatch)
              );
            }
          }
        },
        (error) => {
          this.snackbar.open('Creation Failed', 'x', {
            duration: 3000,
            panelClass: 'notif-error',
          });
        }
      );
  }

  updateSalesRepItemBatch(salesRepItemBatch) {
    const dialogData = {
      salesRepsGroupByUserId: this.salesRepsGroupByUserId,
      salesRepItemBatch: salesRepItemBatch,
    };
    this.dialog
      .open(SalesRepItemBatchCreateUpdateComponent, {
        data: dialogData,
      })
      .afterClosed()
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(
        (salesRepItemBatch) => {
          /**
           * Item is the updated item (if the user pressed Save - otherwise it's null)
           */
          if (salesRepItemBatch) {
            this.sfaService._salesRepItemBatchService
              .updateSalesRepItemBatch(salesRepItemBatch.id, salesRepItemBatch)
              .subscribe((response) => {
                this.getAllSalesRepItemBatches();
                this.snackbar.open('Update Successful', 'x', {
                  duration: 3000,
                  panelClass: 'notif-success',
                });
              });
          }
        },
        (error) => {
          this.snackbar.open('Update Failed', 'x', {
            duration: 3000,
            panelClass: 'notif-error',
          });
        }
      );
  }

  deleteSalesRepItemBatch(salesRepItemBatch) {
    this.sfaService._salesRepItemBatchService
      .deleteSalesRepItemBatch(salesRepItemBatch.id)
      .subscribe((response) => {
        this.getAllSalesRepItemBatches();
        this.snackbar.open('Deletion Successful', 'x', {
          duration: 3000,
          panelClass: 'notif-success',
        });
      });
  }

  filterBySalesRepId() {
    if (this.selectedSalesRepId > 0) {
      this.displaySalesRepItemBatches = this.salesRepItemBatches.filter(
        (x) => x.userId === this.selectedSalesRepId
      );
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.displaySalesRepItemBatches;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.displaySalesRepItemBatches = this.salesRepItemBatches;
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.displaySalesRepItemBatches;

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

  confirmDialog(salesRepItemBatch): void {
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
          this.deleteSalesRepItemBatch(salesRepItemBatch);
        }
      });
  }

  ngOnDestroy() {}
}
