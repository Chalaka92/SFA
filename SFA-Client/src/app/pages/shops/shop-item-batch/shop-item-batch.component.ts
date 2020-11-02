import { Input, OnDestroy, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '@app/common/confirm-dialog/confirm-dialog.component';
import { ItemBatch } from '@app/_models/itemBatch';
import { Shop } from '@app/_models/shop';
import { ShopItemBatch } from '@app/_models/shopItemBatch';
import { SfaService } from '@app/_services/sfa.service';
import { fadeInRightAnimation } from 'src/@sfa/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@sfa/animations/fade-in-up.animation';
import { ListColumn } from 'src/@sfa/shared/list/list-column.model';
import { ShopItemBatchCreateUpdateComponent } from './shop-item-batch-create-update/shop-item-batch-create-update.component';

@Component({
  selector: 'sfa-shop-item-batch',
  templateUrl: './shop-item-batch.component.html',
  styleUrls: ['./shop-item-batch.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class ShopItemBatchComponent implements OnInit, OnDestroy {
  shopItemBatches: ShopItemBatch[];
  shops: Shop[];
  itemBatches: ItemBatch[];
  displayShopItemBatches: ShopItemBatch[];
  selectedShopId: any | 0;

  @Input()
  columns: ListColumn[] = [
    { name: '#Seq', property: 'index', visible: true },
    { name: 'Id', property: 'id', visible: false, isModelProperty: true },
    {
      name: 'Shop',
      property: 'shopName',
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
  dataSource: MatTableDataSource<ShopItemBatch> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private sfaService: SfaService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAllShopItemBatches();
    this.getAllShops();
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

  getAllShopItemBatches() {
    this.sfaService._shopItemBatchService
      .getAllShopItemBatches()
      .subscribe((response) => {
        if (response) {
          this.shopItemBatches = response;
          this.displayShopItemBatches = response;
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = this.displayShopItemBatches;

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

  getAllItemBatches() {
    this.sfaService._itemBatchService
      .getAllItemBatches()
      .subscribe((response) => {
        if (response) {
          this.itemBatches = response;
        }
      });
  }

  createShopItemBatch() {
    const dialogData = { shops: this.shops, itemBatches: this.itemBatches };
    this.dialog
      .open(ShopItemBatchCreateUpdateComponent, {
        data: dialogData,
        width: '25%',
      })
      .afterClosed()
      .subscribe(
        (shopItemBatch: ShopItemBatch) => {
          if (
            this.shopItemBatches.filter(
              (x) =>
                x.itemBatchId === shopItemBatch.itemBatchId &&
                x.shopId === shopItemBatch.shopId
            ).length > 0
          ) {
            this.snackbar.open('Record already exist.', 'x', {
              duration: 3000,
              panelClass: 'notif-error',
            });
          } else {
            if (shopItemBatch) {
              this.sfaService._shopItemBatchService
                .createShopItemBatch(shopItemBatch)
                .subscribe((response) => {
                  this.getAllShopItemBatches();
                  this.snackbar.open('Creation Successful', 'x', {
                    duration: 3000,
                    panelClass: 'notif-success',
                  });
                });
              this.shopItemBatches.unshift(new ShopItemBatch(shopItemBatch));
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

  updateShopItemBatch(shopItemBatch) {
    const dialogData = {
      shops: this.shops,
      itemBatches: this.itemBatches,
      shopItemBatch: shopItemBatch,
    };
    this.dialog
      .open(ShopItemBatchCreateUpdateComponent, {
        data: dialogData,
        width: '25%',
      })
      .afterClosed()
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(
        (shopItemBatch) => {
          /**
           * Item is the updated item (if the user pressed Save - otherwise it's null)
           */
          if (shopItemBatch) {
            this.sfaService._shopItemBatchService
              .updateShopItemBatch(shopItemBatch.id, shopItemBatch)
              .subscribe((response) => {
                this.getAllShopItemBatches();
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

  deleteShopItemBatch(shopItemBatch) {
    this.sfaService._shopItemBatchService
      .deleteShopItemBatch(shopItemBatch.id)
      .subscribe((response) => {
        this.getAllShopItemBatches();
        this.snackbar.open('Deletion Successful', 'x', {
          duration: 3000,
          panelClass: 'notif-success',
        });
      });
  }

  filterByShopId() {
    if (this.selectedShopId > 0) {
      this.displayShopItemBatches = this.shopItemBatches.filter(
        (x) => x.shopId === this.selectedShopId
      );
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.displayShopItemBatches;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.displayShopItemBatches = this.shopItemBatches;
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.displayShopItemBatches;

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

  confirmDialog(shopItemBatch): void {
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
          this.deleteShopItemBatch(shopItemBatch);
        }
      });
  }

  ngOnDestroy() {}
}
