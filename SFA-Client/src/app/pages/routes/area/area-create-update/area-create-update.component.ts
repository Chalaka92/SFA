import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Area } from '@app/_models/area';
import { District } from '@app/_models/district';
import { Province } from '@app/_models/province';

@Component({
  selector: 'sfa-area-create-update',
  templateUrl: './area-create-update.component.html',
  styleUrls: ['./area-create-update.component.scss'],
})
export class AreaCreateUpdateComponent implements OnInit {
  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  provinces: Province[];
  districts: District[];
  selectedProvince: Province;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<AreaCreateUpdateComponent>,
    private fb: FormBuilder
  ) {
    this.provinces = defaults.provinces;
    this.districts = defaults.districts;
  }

  ngOnInit(): void {
    if (this.defaults.area) {
      this.mode = 'update';
      this.selectedProvince = this.provinces.filter(
        (x) => x.id === this.defaults.area.provinceId
      )[0];
    } else {
      this.defaults.area = {} as Area;
      this.selectedProvince = {} as Province;
    }

    this.form = this.fb.group({
      name: [this.defaults.area.name || ''],
      districtId: [this.defaults.area.districtId || null],
      provinceId: [this.defaults.area.provinceId || null],
      areaCode: [this.defaults.area.areaCode || null],
    });
  }
  save() {
    if (this.mode === 'create') {
      this.createArea();
    } else if (this.mode === 'update') {
      this.updateArea();
    }
  }

  createArea() {
    const area = this.form.value;
    this.dialogRef.close(area);
  }

  updateArea() {
    const area = this.form.value;
    area.id = this.defaults.area.id;

    this.dialogRef.close(area);
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
    this.form.patchValue({ districtId: null });
  }
}
