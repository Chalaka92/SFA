import { Input, OnDestroy, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '@app/common/confirm-dialog/confirm-dialog.component';
import { ItemBatch } from '@app/_models/itemBatch';
import { Store } from '@app/_models/store';
import { StoreItemBatch } from '@app/_models/storeItemBatch';
import { SfaService } from '@app/_services/sfa.service';
import { fadeInRightAnimation } from 'src/@sfa/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@sfa/animations/fade-in-up.animation';
import { ListColumn } from 'src/@sfa/shared/list/list-column.model';
import { StoreItemBatchCreateUpdateComponent } from './store-item-batch-create-update/store-item-batch-create-update.component';

@Component({
  selector: 'sfa-store-item-batch',
  templateUrl: './store-item-batch.component.html',
  styleUrls: ['./store-item-batch.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class StoreItemBatchComponent implements OnInit, OnDestroy {
  storeItemBatches: StoreItemBatch[];
  stores: Store[];
  itemBatches: ItemBatch[];
  displayStoreItemBatches: StoreItemBatch[];
  selectedStoreId: any | 0;

  @Input()
  columns: ListColumn[] = [
    { name: '#Seq', property: 'index', visible: true },
    { name: 'Id', property: 'id', visible: false, isModelProperty: true },
    {
      name: 'Store',
      property: 'storeName',
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
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  dataSource: MatTableDataSource<StoreItemBatch> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private sfaService: SfaService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAllStoreItemBatches();
    this.getAllStores();
    this.getAllItemBatches();
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

  getAllStoreItemBatches() {
    this.sfaService._storeItemBatchService
      .getAllStoreItemBatches()
      .subscribe((response) => {
        if (response) {
          this.storeItemBatches = response;
          this.displayStoreItemBatches = response;
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = this.displayStoreItemBatches;

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }

  getAllStores() {
    this.sfaService._storeService.getAllStores().subscribe((response) => {
      if (response) {
        this.stores = response;
      }
    });
  }

  getAllItemBatches() {
    this.sfaService._itemBatchService
      .getAllItemBatches()
      .subscribe((response) => {
        if (response) {
          this.itemBatches = response;
        }
      });
  }

  createStoreItemBatch() {
    const dialogData = { stores: this.stores, itemBatches: this.itemBatches };
    this.dialog
      .open(StoreItemBatchCreateUpdateComponent, {
        data: dialogData,
        width: '25%',
      })
      .afterClosed()
      .subscribe(
        (storeItemBatch: StoreItemBatch) => {
          if (
            this.storeItemBatches.filter(
              (x) =>
                x.itemBatchId === storeItemBatch.itemBatchId &&
                x.storeId === storeItemBatch.storeId
            ).length > 0
          ) {
            this.snackbar.open('Record already exist.', 'x', {
              duration: 3000,
              panelClass: 'notif-error',
            });
          } else {
            if (storeItemBatch) {
              this.sfaService._storeItemBatchService
                .createStoreItemBatch(storeItemBatch)
                .subscribe((response) => {
                  this.getAllStoreItemBatches();
                  this.getAllItemBatches();
                  this.snackbar.open('Creation Successful', 'x', {
                    duration: 3000,
                    panelClass: 'notif-success',
                  });
                });
              this.storeItemBatches.unshift(new StoreItemBatch(storeItemBatch));
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

  updateStoreItemBatch(storeItemBatch) {
    const dialogData = {
      stores: this.stores,
      itemBatches: this.itemBatches,
      storeItemBatch: storeItemBatch,
    };
    this.dialog
      .open(StoreItemBatchCreateUpdateComponent, {
        data: dialogData,
        width: '25%',
      })
      .afterClosed()
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(
        (storeItemBatch) => {
          /**
           * Item is the updated item (if the user pressed Save - otherwise it's null)
           */
          if (storeItemBatch) {
            this.sfaService._storeItemBatchService
              .updateStoreItemBatch(storeItemBatch.id, storeItemBatch)
              .subscribe((response) => {
                this.getAllStoreItemBatches();
                this.getAllItemBatches();
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

  deleteStoreItemBatch(storeItemBatch) {
    this.sfaService._storeItemBatchService
      .deleteStoreItemBatch(storeItemBatch.id)
      .subscribe((response) => {
        this.getAllStoreItemBatches();
        this.getAllItemBatches();
        this.snackbar.open('Deletion Successful', 'x', {
          duration: 3000,
          panelClass: 'notif-success',
        });
      });
  }

  filterByStoreId() {
    if (this.selectedStoreId > 0) {
      this.displayStoreItemBatches = this.storeItemBatches.filter(
        (x) => x.storeId === this.selectedStoreId
      );
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.displayStoreItemBatches;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.displayStoreItemBatches = this.storeItemBatches;
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.displayStoreItemBatches;

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

  confirmDialog(storeItemBatch): void {
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
          this.deleteStoreItemBatch(storeItemBatch);
        }
      });
  }

  ngOnDestroy() {}
}
