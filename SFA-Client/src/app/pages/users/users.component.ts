import { DatePipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '@app/common/confirm-dialog/confirm-dialog.component';
import { UserDetail } from '@app/_models/userDetails';
import { SfaService } from '@app/_services/sfa.service';
import { fadeInRightAnimation } from 'src/@sfa/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@sfa/animations/fade-in-up.animation';
import { ListColumn } from 'src/@sfa/shared/list/list-column.model';
import { UsersService } from './users.service';

@Component({
  selector: 'sfa-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class UsersComponent implements OnInit, OnDestroy {
  userDetails: UserDetail[];

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
      name: 'First Name',
      property: 'firstName',
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: 'Middle Name',
      property: 'middleName',
      visible: false,
      isModelProperty: true,
      isList: false,
    },
    {
      name: 'Last Name',
      property: 'lastName',
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: 'User Code',
      property: 'userCode',
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: 'Birthday',
      property: 'birthday',
      visible: true,
      isModelProperty: true,
      isList: false,
      headerClass: 'headerCenterAlign',
      cellClass: 'cellCenterAlign',
    },
    {
      name: 'RoleName',
      property: 'roleName',
      visible: true,
      isModelProperty: true,
      isList: false,
    },
    {
      name: 'NIC',
      property: 'nic',
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
      cellClass: 'textWrapper',
    },
    {
      name: 'Emails',
      property: 'userEmails',
      visible: true,
      isModelProperty: true,
      isList: true,
    },
    {
      name: 'Contacts',
      property: 'userContacts',
      visible: true,
      isModelProperty: true,
      isList: true,
    },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  dataSource: MatTableDataSource<UserDetail> | null;

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
  getAllUserDetails() {
    this.sfaService._userService.getAllUserDetails().subscribe((response) => {
      if (response) {
        response.forEach((x) => {
          x.birthday = this.datePipe.transform(x.birthday, 'dd-MMM-yyyy');
        });
        this.userDetails = response;
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = this.userDetails;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  ngOnInit() {
    this.getAllUserDetails();
  }

  deleteUserDetail(userDetail) {
    this.sfaService._userService
      .deleteUserDetail(userDetail.id)
      .subscribe((response) => {
        this.getAllUserDetails();
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

  confirmDialog(userDetail): void {
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
          this.deleteUserDetail(userDetail);
        }
      });
  }

  ngOnDestroy() {}
}
