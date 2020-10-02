import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '@app/common/confirm-dialog/confirm-dialog.component';
import { SalesRep } from '@app/_models/salesRep';
import { SfaService } from '@app/_services/sfa.service';
import { ListColumn } from 'src/@sfa/shared/list/list-column.model';
import { SalesRepsCreateUpdateComponent } from './sales-reps-create-update/sales-reps-create-update.component';

@Component({
  selector: 'sfa-sales-reps',
  templateUrl: './sales-reps.component.html',
  styleUrls: ['./sales-reps.component.scss'],
})
export class SalesRepsComponent implements OnInit, OnDestroy {
  salesReps: SalesRep[];

  @Input()
  columns: ListColumn[] = [
    { name: '#Seq', property: 'index', visible: true },
    { name: 'Id', property: 'id', visible: false, isModelProperty: true },
    {
      name: 'Name',
      property: 'userName',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Sales Rep Code',
      property: 'salesRepCode',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Assigned Area',
      property: 'assignedAreaName',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Assigned Store',
      property: 'assignedStoreName',
      visible: true,
      isModelProperty: true,
    },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  dataSource: MatTableDataSource<SalesRep> | null;

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
  getAllSalesReps() {
    this.sfaService._salesRepService.getAllSalesReps().subscribe((response) => {
      if (response) {
        this.salesReps = response;
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = this.salesReps;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  ngOnInit() {
    this.getAllSalesReps();
  }

  createSalesRep() {
    this.dialog
      .open(SalesRepsCreateUpdateComponent, { width: '25%' })
      .afterClosed()
      .subscribe((salesRep: SalesRep) => {
        /**
         * SalesRep is the updated salesRep (if the user pressed Save - otherwise it's null)
         */
        if (salesRep) {
          this.sfaService._salesRepService
            .createSalesRep(salesRep)
            .subscribe(() => {
              this.getAllSalesReps();
              this.snackbar.open('Creation Successful', 'x', {
                duration: 3000,
                panelClass: 'notif-success',
              });
            });
          this.salesReps.unshift(new SalesRep(salesRep));
        }
      });
  }

  updateSalesRep(salesRep) {
    this.dialog
      .open(SalesRepsCreateUpdateComponent, {
        data: salesRep,
        width: '25%',
      })
      .afterClosed()
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe((salesRep) => {
        /**
         * SalesRep is the updated salesRep (if the user pressed Save - otherwise it's null)
         */
        if (salesRep) {
          this.sfaService._salesRepService
            .updateSalesRep(salesRep.id, salesRep)
            .subscribe(() => {
              this.getAllSalesReps();
              this.snackbar.open('Update Successful', 'x', {
                duration: 3000,
                panelClass: 'notif-success',
              });
            });
        }
      });
  }

  deleteSalesRep(salesRep) {
    this.sfaService._salesRepService
      .deleteSalesRep(salesRep.id)
      .subscribe(() => {
        this.getAllSalesReps();
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

  confirmDialog(salesRep): void {
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
          this.deleteSalesRep(salesRep);
        }
      });
  }

  ngOnDestroy() {}
}
