import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '@app/common/confirm-dialog/confirm-dialog.component';
import { Store } from '@app/_models/store';
import { SfaService } from '@app/_services/sfa.service';
import { fadeInRightAnimation } from 'src/@sfa/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@sfa/animations/fade-in-up.animation';
import { ListColumn } from 'src/@sfa/shared/list/list-column.model';

@Component({
  selector: 'sfa-stores',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class StoreComponent implements OnInit, OnDestroy {
  stores: Store[];

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
      name: 'Name',
      property: 'name',
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: 'Store Code',
      property: 'storeCode',
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: 'Store Manager',
      property: 'storeManagerName',
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: 'Route',
      property: 'routeName',
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: 'Created By',
      property: 'createdBy',
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: 'Address',
      property: 'displayAddress',
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: 'Emails',
      property: 'storeEmails',
      visible: true,
      isModelProperty: true,
      isList: true,
    },
    {
      name: 'Contacts',
      property: 'storeContacts',
      visible: true,
      isModelProperty: true,
      isList: true,
    },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  dataSource: MatTableDataSource<Store> | null;

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
  getAllStores() {
    this.sfaService._storeService.getAllStores().subscribe((response) => {
      if (response) {
        this.stores = response;
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = this.stores;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  ngOnInit() {
    this.getAllStores();
  }

  deleteStore(store) {
    this.sfaService._storeService.deleteStore(store.id).subscribe(
      () => {
        this.getAllStores();
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

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  confirmDialog(store): void {
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
          this.deleteStore(store);
        }
      });
  }

  ngOnDestroy() {}
}
