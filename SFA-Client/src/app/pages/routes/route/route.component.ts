import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { fadeInUpAnimation } from 'src/@sfa/animations/fade-in-up.animation';
import { fadeInRightAnimation } from '../../../../@sfa/animations/fade-in-right.animation';
import { ListColumn } from '../../../../@sfa/shared/list/list-column.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Route } from '@app/_models/route';
import { Area } from '@app/_models/area';
import { Province } from '@app/_models/province';
import { RouteService } from './route.service';
import { AreaService } from '../area/area.service';
import { ProvinceService } from '../province/province.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouteCreateUpdateComponent } from './route-create-update/route-create-update.component';
import { ConfirmDialogComponent } from '@app/common/confirm-dialog/confirm-dialog.component';
import { District } from '@app/_models/district';
import { DistrictService } from '../district/district.service';

@Component({
  selector: 'sfa-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class RouteComponent implements OnInit, OnDestroy {
  routes: Route[];
  displayRoutes: Route[];
  areas: Area[];
  provinces: Province[];
  districts: District[];
  selectedAreaId: any | 0;

  @Input()
  columns: ListColumn[] = [
    { name: '#Seq', property: 'index', visible: true },
    { name: 'Id', property: 'id', visible: false, isModelProperty: true },
    { name: 'Name', property: 'name', visible: true, isModelProperty: true },
    {
      name: 'Route Code',
      property: 'routeCode',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'Store Count',
      property: 'storeCount',
      visible: true,
      isModelProperty: true,
    },

    {
      name: 'Area',
      property: 'areaName',
      visible: true,
      isModelProperty: true,
    },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  dataSource: MatTableDataSource<Route> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private routeService: RouteService,
    private areaService: AreaService,
    private provinceService: ProvinceService,
    private districtService: DistrictService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAllProvinces();
    this.getAllDistricts();
    this.getAllAreas();
    this.getAllRoutes();
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
  getAllProvinces() {
    this.provinceService.getAllProvinces().subscribe((response) => {
      if (response) {
        this.provinces = response;
      }
    });
  }

  getAllDistricts() {
    this.districtService.getAllDistricts().subscribe((response) => {
      if (response) {
        this.districts = response;
      }
    });
  }

  getAllAreas() {
    this.areaService.getAllAreas().subscribe((response) => {
      if (response) {
        this.areas = response;
      }
    });
  }

  getAllRoutes() {
    this.routeService.getAllRoutes().subscribe((response) => {
      if (response) {
        this.routes = response;
        this.displayRoutes = response;
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = this.displayRoutes;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  createRoute() {
    const dialogData = {
      provinces: this.provinces,
      areas: this.areas,
      districts: this.districts,
    };
    this.dialog
      .open(RouteCreateUpdateComponent, {
        data: dialogData,
      })
      .afterClosed()
      .subscribe((route: Route) => {
        /**
         * Route is the updated route (if the user pressed Save - otherwise it's null)
         */
        if (route) {
          this.routeService.createRoute(route).subscribe(() => {
            this.getAllRoutes();
            this.snackbar.open('Creation Successful', 'x', {
              duration: 3000,
              panelClass: 'notif-success',
            });
          });
          this.routes.unshift(new Route(route));
        }
      });
  }

  updateRoute(route) {
    const dialogData = {
      provinces: this.provinces,
      areas: this.areas,
      route: route,
      districts: this.districts,
    };
    console.log(dialogData);
    this.dialog
      .open(RouteCreateUpdateComponent, {
        data: dialogData,
      })
      .afterClosed()
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe((route) => {
        /**
         * Route is the updated route (if the user pressed Save - otherwise it's null)
         */
        if (route) {
          this.routeService.updateRoute(route.id, route).subscribe(() => {
            this.getAllRoutes();
            this.snackbar.open('Update Successful', 'x', {
              duration: 3000,
              panelClass: 'notif-success',
            });
          });
        }
      });
  }

  deleteRoute(route) {
    this.routeService.deleteRoute(route.id).subscribe(() => {
      this.getAllRoutes();
      this.snackbar.open('Deletion Successful', 'x', {
        duration: 3000,
        panelClass: 'notif-success',
      });
    });
  }

  filterByAreaId() {
    if (this.selectedAreaId > 0) {
      this.displayRoutes = this.routes.filter(
        (x) => x.areaId === this.selectedAreaId
      );
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.displayRoutes;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.displayRoutes = this.routes;
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.displayRoutes;

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

  confirmDialog(route): void {
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
          this.deleteRoute(route);
        }
      });
  }

  ngOnDestroy() {}
}
