import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '@app/common/confirm-dialog/confirm-dialog.component';
import { ShopCategory } from '@app/_models/shopCategory';
import { SfaService } from '@app/_services/sfa.service';
import { fadeInRightAnimation } from 'src/@sfa/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@sfa/animations/fade-in-up.animation';
import { ListColumn } from 'src/@sfa/shared/list/list-column.model';
import { ShopCategoryCreateUpdateComponent } from './shop-category-create-update/shop-category-create-update.component';

@Component({
  selector: 'sfa-shop-category',
  templateUrl: './shop-category.component.html',
  styleUrls: ['./shop-category.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class ShopCategoryComponent implements OnInit, OnDestroy {
  shopCategories: ShopCategory[];

  @Input()
  columns: ListColumn[] = [
    { name: '#Seq', property: 'index', visible: true },
    { name: 'Id', property: 'id', visible: false, isModelProperty: true },
    { name: 'Name', property: 'name', visible: true, isModelProperty: true },
    {
      name: 'Description',
      property: 'description',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Category Code',
      property: 'shopCategoryCode',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Maximum Debt Amount',
      property: 'maximumDebtAmount',
      visible: true,
      isModelProperty: true,
      displayFn: ' | number:2',
      headerClass: 'headerRightAlign',
      cellClass: 'cellRightAlign',
    },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  dataSource: MatTableDataSource<ShopCategory> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private sfaService: SfaService,
    private snackbar: MatSnackBar
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
  getAllShopCategorys() {
    this.sfaService._shopCategoryService
      .getAllShopCategories()
      .subscribe((response) => {
        if (response) {
          this.shopCategories = response;
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = this.shopCategories;

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }

  ngOnInit() {
    this.getAllShopCategorys();
  }

  createShopCategory() {
    this.dialog
      .open(ShopCategoryCreateUpdateComponent, { width: '25%' })
      .afterClosed()
      .subscribe((shopCategory: ShopCategory) => {
        /**
         * ShopCategory is the updated shopCategory (if the user pressed Save - otherwise it's null)
         */
        if (shopCategory) {
          this.sfaService._shopCategoryService
            .createShopCategory(shopCategory)
            .subscribe(
              () => {
                this.getAllShopCategorys();
                this.snackbar.open('Creation Successful', 'x', {
                  duration: 3000,
                  panelClass: 'notif-success',
                });
              },
              () => {
                this.snackbar.open('Creation Failed', 'x', {
                  duration: 3000,
                  panelClass: 'notif-error',
                });
              }
            );
          this.shopCategories.unshift(new ShopCategory(shopCategory));
        }
      });
  }

  updateShopCategory(shopCategory) {
    this.dialog
      .open(ShopCategoryCreateUpdateComponent, {
        data: shopCategory,
        width: '25%',
      })
      .afterClosed()
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe((shopCategory) => {
        /**
         * ShopCategory is the updated shopCategory (if the user pressed Save - otherwise it's null)
         */
        if (shopCategory) {
          this.sfaService._shopCategoryService
            .updateShopCategory(shopCategory.id, shopCategory)
            .subscribe(
              () => {
                this.getAllShopCategorys();
                this.snackbar.open('Update Successful', 'x', {
                  duration: 3000,
                  panelClass: 'notif-success',
                });
              },
              () => {
                this.snackbar.open('Update Failed', 'x', {
                  duration: 3000,
                  panelClass: 'notif-error',
                });
              }
            );
        }
      });
  }

  deleteShopCategory(shopCategory) {
    this.sfaService._shopCategoryService
      .deleteShopCategory(shopCategory.id)
      .subscribe(() => {
        this.getAllShopCategorys();
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

  confirmDialog(shopCategory): void {
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
          this.deleteShopCategory(shopCategory);
        }
      });
  }

  ngOnDestroy() {}
}
