import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '@app/common/confirm-dialog/confirm-dialog.component';
import { Area } from '@app/_models/area';
import { District } from '@app/_models/district';
import { Province } from '@app/_models/province';
import { fadeInRightAnimation } from 'src/@sfa/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@sfa/animations/fade-in-up.animation';
import { ListColumn } from 'src/@sfa/shared/list/list-column.model';
import { DistrictService } from '../district/district.service';
import { AreaService } from './area.service';
import { AreaCreateUpdateComponent } from './area-create-update/area-create-update.component';
import { ProvinceService } from '../province/province.service';
import { SfaService } from '@app/_services/sfa.service';

@Component({
  selector: 'sfa-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class AreaComponent implements OnInit, OnDestroy {
  areas: Area[];
  displayAreas: Area[];
  districts: District[];
  provinces: Province[];
  selectedDistrictId: any | 0;

  @Input()
  columns: ListColumn[] = [
    { name: '#Seq', property: 'index', visible: true },
    { name: 'Id', property: 'id', visible: false, isModelProperty: true },
    { name: 'Name', property: 'name', visible: true, isModelProperty: true },
    {
      name: 'Area Code',
      property: 'areaCode',
      visible: true,
      isModelProperty: true,
    },
    {
      name: 'District',
      property: 'districtName',
      visible: true,
      isModelProperty: true,
    },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  dataSource: MatTableDataSource<Area> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private sfaService: SfaService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAllProvinces();
    this.getAllDistricts();
    this.getAllAreas();
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
    this.sfaService._provinceService.getAllProvinces().subscribe((response) => {
      if (response) {
        this.provinces = response;
      }
    });
  }

  getAllDistricts() {
    this.sfaService._districtService.getAllDistricts().subscribe((response) => {
      if (response) {
        this.districts = response;
      }
    });
  }

  getAllAreas() {
    this.sfaService._areaService.getAllAreas().subscribe((response) => {
      if (response) {
        this.areas = response;
        this.displayAreas = response;
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = this.displayAreas;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  createArea() {
    const dialogData = { provinces: this.provinces, districts: this.districts };
    this.dialog
      .open(AreaCreateUpdateComponent, {
        data: dialogData,
      })
      .afterClosed()
      .subscribe((area: Area) => {
        /**
         * Area is the updated area (if the user pressed Save - otherwise it's null)
         */
        if (area) {
          this.sfaService._areaService
            .createArea(area)
            .subscribe((response) => {
              this.getAllAreas();
              this.snackbar.open('Creation Successful', 'x', {
                duration: 3000,
                panelClass: 'notif-success',
              });
            });
          this.areas.unshift(new Area(area));
        }
      });
  }

  updateArea(area) {
    const dialogData = {
      provinces: this.provinces,
      districts: this.districts,
      area: area,
    };
    console.log(dialogData);
    this.dialog
      .open(AreaCreateUpdateComponent, {
        data: dialogData,
      })
      .afterClosed()
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe((area) => {
        /**
         * Area is the updated area (if the user pressed Save - otherwise it's null)
         */
        if (area) {
          this.sfaService._areaService
            .updateArea(area.id, area)
            .subscribe((response) => {
              this.getAllAreas();
              this.snackbar.open('Update Successful', 'x', {
                duration: 3000,
                panelClass: 'notif-success',
              });
            });
        }
      });
  }

  deleteArea(area) {
    this.sfaService._areaService.deleteArea(area.id).subscribe((response) => {
      this.getAllAreas();
      this.snackbar.open('Deletion Successful', 'x', {
        duration: 3000,
        panelClass: 'notif-success',
      });
    });
  }

  filterByDistrictId() {
    if (this.selectedDistrictId > 0) {
      this.displayAreas = this.areas.filter(
        (x) => x.districtId === this.selectedDistrictId
      );
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.displayAreas;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.displayAreas = this.areas;
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.displayAreas;

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

  confirmDialog(area): void {
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
          this.deleteArea(area);
        }
      });
  }

  ngOnDestroy() {}
}
