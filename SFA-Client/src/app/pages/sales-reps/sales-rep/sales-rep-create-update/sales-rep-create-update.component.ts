import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Area } from '@app/_models/area';
import { SalesRep } from '@app/_models/salesRep';
import { Store } from '@app/_models/store';
import { UserDetail } from '@app/_models/userDetails';
import { SfaService } from '@app/_services/sfa.service';

@Component({
  selector: 'sfa-sales-rep-create-update',
  templateUrl: './sales-rep-create-update.component.html',
  styleUrls: ['./sales-rep-create-update.component.scss'],
})
export class SalesRepCreateUpdateComponent implements OnInit {
  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  users: UserDetail[];
  areas: Area[];
  stores: Store[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<SalesRepCreateUpdateComponent>,
    private fb: FormBuilder,
    private sfaService: SfaService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllAreas();
    this.getAllStores();

    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as SalesRep;
    }

    this.form = this.fb.group({
      userId: [this.defaults.userId || null],
      salesRepCode: [this.defaults.salesRepCode || null],
      assignedStoreId: [this.defaults.assignedStoreId || null],
      assignedAreaId: [this.defaults.assignedAreaId || null],
    });
  }

  getAllUsers() {
    this.sfaService._userService.getAllUserDetails().subscribe((response) => {
      if (response) {
        this.users = response;
      }
    });
  }

  getAllAreas() {
    this.sfaService._areaService.getAllAreas().subscribe((response) => {
      if (response) {
        this.areas = response;
      }
    });
  }

  getAllStores() {
    this.sfaService._storeService.getAllStores().subscribe((response) => {
      if (response) {
        this.stores = response;
      }
    });
  }

  save() {
    if (this.mode === 'create') {
      this.createSalesRep();
    } else if (this.mode === 'update') {
      this.updateSalesRep();
    }
  }

  createSalesRep() {
    const salesRep = this.form.value;
    this.dialogRef.close(salesRep);
  }

  updateSalesRep() {
    const salesRep = this.form.value;
    salesRep.id = this.defaults.id;

    this.dialogRef.close(salesRep);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
