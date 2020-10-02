import { DatePipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '@app/common/confirm-dialog/confirm-dialog.component';
import { Item } from '@app/_models/item';
import { ItemBatch } from '@app/_models/itemBatch';
import { SfaService } from '@app/_services/sfa.service';
import { fadeInRightAnimation } from 'src/@sfa/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@sfa/animations/fade-in-up.animation';
import { ListColumn } from 'src/@sfa/shared/list/list-column.model';
import { ItemBatchCreateUpdateComponent } from './item-batch-create-update/item-batch-create-update.component';

@Component({
  selector: 'sfa-item-batch',
  templateUrl: './item-batch.component.html',
  styleUrls: ['./item-batch.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class ItemBatchComponent implements OnInit, OnDestroy {
  itemBatches: ItemBatch[];
  items: Item[];
  displayItemBatches: ItemBatch[];
  selectedItemId: any | 0;

  @Input()
  columns: ListColumn[] = [
    { name: '#Seq', property: 'index', visible: true },
    { name: 'Id', property: 'id', visible: false, isModelProperty: true },
    { name: 'Name', property: 'name', visible: true, isModelProperty: true },
    {
      name: 'Item Batch Code',
      property: 'itemBatchCode',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Item',
      property: 'itemName',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Status',
      property: 'itemStatusName',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'item Count',
      property: 'itemCount',
      visible: true,
      isModelProperty: true,
      headerClass: 'headerRightAlign',
      cellClass: 'cellRightAlign',
    },
    {
      name: 'Max Retail Price',
      property: 'maxRetailPrice',
      visible: true,
      isModelProperty: true,
      displayFn: ' | number:2',
      headerClass: 'headerRightAlign',
      cellClass: 'cellRightAlign',
    },
    {
      name: 'Manufacture Date',
      property: 'manufactureDate',
      visible: true,
      isModelProperty: true,
      headerClass: 'headerCenterAlign',
      cellClass: 'cellCenterAlign',
    },
    {
      name: 'Expiry Date',
      property: 'expiryDate',
      visible: true,
      isModelProperty: true,
      headerClass: 'headerCenterAlign',
      cellClass: 'cellCenterAlign',
    },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  dataSource: MatTableDataSource<ItemBatch> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private sfaService: SfaService,
    private snackbar: MatSnackBar,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.getAllItemBatches();
    this.getAllItems();
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

  getAllItemBatches() {
    this.sfaService._itemBatchService
      .getAllItemBatches()
      .subscribe((response) => {
        if (response) {
          // response.forEach((x) => {
          //   x.manufactureDate = this.datePipe.transform(
          //     x.manufactureDate,
          //     'dd-MMM-yyyy'
          //   );
          //   x.expiryDate = this.datePipe.transform(x.expiryDate, 'dd-MMM-yyyy');
          // });
          this.itemBatches = response;
          this.displayItemBatches = response;
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = this.displayItemBatches;

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }

  getAllItems() {
    this.sfaService._itemService.getAllItems().subscribe((response) => {
      if (response) {
        this.items = response;
      }
    });
  }

  createItemBatch() {
    const dialogData = { items: this.items };
    this.dialog
      .open(ItemBatchCreateUpdateComponent, {
        data: dialogData,
      })
      .afterClosed()
      .subscribe((itemBatch: ItemBatch) => {
        /**
         * Item is the updated item (if the user pressed Save - otherwise it's null)
         */
        if (itemBatch) {
          this.sfaService._itemBatchService
            .createItemBatch(itemBatch)
            .subscribe((response) => {
              this.getAllItemBatches();
              this.snackbar.open('Creation Successful', 'x', {
                duration: 3000,
                panelClass: 'notif-success',
              });
            });
          this.itemBatches.unshift(new ItemBatch(itemBatch));
        }
      });
  }

  updateItemBatch(itemBatch) {
    const dialogData = {
      items: this.items,
      itemBatch: itemBatch,
    };
    this.dialog
      .open(ItemBatchCreateUpdateComponent, {
        data: dialogData,
      })
      .afterClosed()
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe((itemBatch) => {
        /**
         * Item is the updated item (if the user pressed Save - otherwise it's null)
         */
        if (itemBatch) {
          this.sfaService._itemBatchService
            .updateItemBatch(itemBatch.id, itemBatch)
            .subscribe((response) => {
              this.getAllItemBatches();
              this.snackbar.open('Update Successful', 'x', {
                duration: 3000,
                panelClass: 'notif-success',
              });
            });
        }
      });
  }

  deleteItemBatch(itemBatch) {
    this.sfaService._itemBatchService
      .deleteItemBatch(itemBatch.id)
      .subscribe((response) => {
        this.getAllItems();
        this.snackbar.open('Deletion Successful', 'x', {
          duration: 3000,
          panelClass: 'notif-success',
        });
      });
  }

  filterByItemId() {
    if (this.selectedItemId > 0) {
      this.displayItemBatches = this.itemBatches.filter(
        (x) => x.itemId === this.selectedItemId
      );
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.displayItemBatches;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.displayItemBatches = this.itemBatches;
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.displayItemBatches;

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

  confirmDialog(itemBatch): void {
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
          this.deleteItemBatch(itemBatch);
        }
      });
  }

  ngOnDestroy() {}
}
