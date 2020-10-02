import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Route } from '@app/_models/route';
import { District } from '@app/_models/district';
import { Province } from '@app/_models/province';
import { Area } from '@app/_models/area';
import { fadeInUpAnimation } from 'src/@sfa/animations/fade-in-up.animation';
import { fadeInRightAnimation } from 'src/@sfa/animations/fade-in-right.animation';

@Component({
  selector: 'sfa-route-create-update',
  templateUrl: './route-create-update.component.html',
  styleUrls: ['./route-create-update.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class RouteCreateUpdateComponent implements OnInit {
  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  provinces: Province[];
  areas: Area[];
  districts: District[];
  selectedProvince: Province;
  selectedDistrict: District;
  mapData: any;

  private _gap = 16;
  gap = `${this._gap}px`;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<RouteCreateUpdateComponent>,
    private fb: FormBuilder
  ) {
    this.provinces = defaults.provinces;
    this.areas = defaults.areas;
    this.districts = defaults.districts;
  }

  ngOnInit(): void {
    if (this.defaults.route) {
      this.mode = 'update';
      this.selectedProvince = this.provinces.filter(
        (x) => x.id === this.defaults.route.provinceId
      )[0];
      this.selectedDistrict = this.selectedProvince.districts.filter(
        (x) => x.id === this.defaults.route.districtId
      )[0];

      this.mapData = {
        slat: this.defaults.route.startLatitude || null,
        slng: this.defaults.route.startLongitude || null,
        elat: this.defaults.route.endLatitude || null,
        elng: this.defaults.route.endLongitude || null,
      };
    } else {
      this.defaults.route = {} as Route;
      this.selectedProvince = {} as Province;
      this.selectedDistrict = {} as District;
    }

    this.form = this.fb.group({
      name: [this.defaults.route.name || ''],
      areaId: [this.defaults.route.areaId || null],
      districtId: [this.defaults.route.districtId || null],
      provinceId: [this.defaults.route.provinceId || null],
      routeCode: [this.defaults.route.routeCode || null],
      storeCount: [this.defaults.route.storeCount || null],
      startLatitude: [this.defaults.route.startLatitude || null],
      startLongitude: [this.defaults.route.startLongitude || null],
      endLatitude: [this.defaults.route.endLatitude || null],
      endLongitude: [this.defaults.route.endLongitude || null],
      comment: [this.defaults.route.comment || null],
    });
  }
  save() {
    if (this.mode === 'create') {
      this.createRoute();
    } else if (this.mode === 'update') {
      this.updateRoute();
    }
  }

  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${
      this._gap - this._gap / colAmount
    }px)`;
  }

  createRoute() {
    const route = this.form.value;
    this.dialogRef.close(route);
  }

  updateRoute() {
    const route = this.form.value;
    route.id = this.defaults.route.id;

    this.dialogRef.close(route);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  setSelectedProvince(provinceId: any) {
    this.selectedProvince = this.provinces.filter(
      (x) => x.id === provinceId
    )[0];
    if (this.selectedProvince) {
      this.districts = this.selectedProvince.districts;
    }
    this.areas = [];
    this.form.patchValue({ districtId: null });
  }

  setSelectedDistrict(districtId: any) {
    this.selectedDistrict = this.districts.filter(
      (x) => x.id === districtId
    )[0];

    if (this.selectedDistrict) {
      this.areas = this.selectedDistrict.areas;
    }

    this.form.patchValue({ areaId: null });
  }
}
