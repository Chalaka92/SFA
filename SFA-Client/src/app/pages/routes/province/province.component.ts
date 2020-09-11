import {
  Component,
  OnInit,
  ViewChild,
  Input,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { ProvinceService } from './province.service';
import { Province } from '@app/_models/province';
import { ReplaySubject, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';
import { ProvinceCreateUpdateComponent } from './province-create-update/province-create-update.component';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';

@Component({
  selector: 'fury-province',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class ProvinceComponent implements OnInit, OnDestroy {
  provinces: Province[];

  @Input()
  columns: ListColumn[] = [
    { name: 'Id', property: 'id', visible: true, isModelProperty: true },
    { name: 'Name', property: 'name', visible: true, isModelProperty: true },
    { name: 'Actions', property: 'actions', visible: true },
  ] as ListColumn[];
  pageSize = 10;
  dataSource: MatTableDataSource<Province> | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private provinceService: ProvinceService
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
  getAllProvinces() {
    this.provinceService.getAllProvinces().subscribe((response) => {
      if (response) {
        this.provinces = response;
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = this.provinces;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  ngOnInit() {
    this.getAllProvinces();
  }

  createProvince() {
    this.dialog
      .open(ProvinceCreateUpdateComponent)
      .afterClosed()
      .subscribe((province: Province) => {
        /**
         * Province is the updated province (if the user pressed Save - otherwise it's null)
         */
        if (province) {
          this.provinceService
            .createProvince(province)
            .subscribe((response) => {
              console.log(response);
            });
          this.provinces.unshift(new Province(province));
        }
      });
  }

  updateProvince(province) {
    this.dialog
      .open(ProvinceCreateUpdateComponent, {
        data: province,
      })
      .afterClosed()
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe((province) => {
        /**
         * Province is the updated province (if the user pressed Save - otherwise it's null)
         */
        if (province) {
          this.provinceService
            .updateProvince(province.id, province)
            .subscribe((response) => {
              console.log(response);
            });
          const index = this.provinces.findIndex(
            (existingProvince) => existingProvince.id === province.id
          );
          this.provinces[index] = new Province(province);
        }
      });
  }

  deleteProvince(province) {
    this.provinceService.deleteProvince(province.id).subscribe((response) => {
      console.log(response);
      this.provinces.splice(
        this.provinces.findIndex(
          (existingProvince) => existingProvince.id === province.id
        ),
        1
      );
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

  ngOnDestroy() {}
}
