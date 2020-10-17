import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { District } from '@app/_models/district';
import { Province } from '@app/_models/province';
import { Route } from '@app/_models/route';
import {
  Store,
  StoreEmail,
  StoreContact,
  StoreAddress,
} from '@app/_models/store';
import { UserDetail } from '@app/_models/userDetails';
import { AuthService } from '@app/_services/auth.service';
import { SfaService } from '@app/_services/sfa.service';
import { fadeInRightAnimation } from 'src/@sfa/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@sfa/animations/fade-in-up.animation';

@Component({
  selector: 'sfa-store-create-update',
  templateUrl: './store-create-update.component.html',
  styleUrls: ['./store-create-update.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class StoreCreateUpdateComponent implements OnInit {
  form: FormGroup;

  mode: 'create' | 'update' = 'create';
  users: UserDetail[];
  defaults: Store;
  storeId: number;
  provinces: Province[];
  districts: District[];
  selectedProvince: Province;
  routes: Route[];

  private _gap = 16;
  gap = `${this._gap}px`;

  constructor(
    private fb: FormBuilder,
    private sfaService: SfaService,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getAllUsers();
    this.getAllProvinces();
    this.getAllDistricts();
    this.getAllRoutes();

    this.activatedRoute.params.subscribe((params) => {
      this.storeId = params['storeId'];
      if (this.storeId) {
        this.getSingleStore(this.storeId);
        this.mode = 'update';
      } else {
        this.defaults = {} as Store;

        this.defaults.storeEmails = [] as StoreEmail[];
        this.defaults.storeEmails.push({} as StoreEmail);

        this.defaults.storeContacts = [] as StoreContact[];
        this.defaults.storeContacts.push({} as StoreContact);

        this.defaults.storeAddresses = [] as StoreAddress[];
        this.defaults.storeAddresses.push({} as StoreAddress);

        this.buildForm();
      }
    });
  }

  buildForm() {
    // create a form group for each item in the model
    const addressFormGroups = this.defaults.storeAddresses.map((x) =>
      this.fb.group({
        id: this.fb.control(x.id || 0),
        address1: this.fb.control(x.address1),
        address2: this.fb.control(x.address2),
        address3: this.fb.control(x.address3),
        districtId: this.fb.control(x.districtId || 0),
        provinceId: this.fb.control(x.provinceId || 0),
        locationLatitude: this.fb.control(x.locationLatitude),
        locationLongitude: this.fb.control(x.locationLongitude),
      })
    );
    const emailFormGroups = this.defaults.storeEmails.map((x) =>
      this.fb.group({
        id: this.fb.control(x.id || 0),
        email: this.fb.control(x.email),
      })
    );
    const contactFormGroups = this.defaults.storeContacts.map((x) =>
      this.fb.group({
        id: this.fb.control(x.id || 0),
        contactNo: this.fb.control(x.contactNo),
      })
    );

    // create a form array for the groups
    const emailFormArray = this.fb.array(emailFormGroups);
    const contactFormArray = this.fb.array(contactFormGroups);
    const addressFormArray = this.fb.array(addressFormGroups);

    this.form = this.fb.group({
      routeId: [this.defaults.routeId || null],
      storeManagerId: [this.defaults.storeManagerId || null],
      storeCode: [this.defaults.storeCode || null],
      name: [this.defaults.name || null],
      comment: [this.defaults.comment || null],
      storeEmails: emailFormArray,
      storeContacts: contactFormArray,
      storeAddresses: addressFormArray,
    });
  }

  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${
      this._gap - this._gap / colAmount
    }px)`;
  }

  save() {
    if (this.mode === 'create') {
      this.createStore();
    } else if (this.mode === 'update') {
      this.updateStore();
    }
  }

  createStore() {
    const store: Store = this.form.value;
    store.createdDate = new Date();
    store.loginEmail = this.authService.currentUserValue.email;

    if (store) {
      this.sfaService._storeService.createStore(store).subscribe(
        () => {
          this.snackbar.open('Store Creation Successful.', 'x', {
            duration: 3000,
            panelClass: 'notif-success',
          });
        },
        (error) => {
          console.log(error);
          this.snackbar.open('Store Creation Failed.', 'x', {
            duration: 3000,
            panelClass: 'notif-error',
          });
        }
      );
    }
  }

  updateStore() {
    const store: Store = this.form.value;
    store.id = this.storeId;
    if (store) {
      this.sfaService._storeService.updateStore(store.id, store).subscribe(
        () => {
          this.snackbar.open('Update Successful.', 'x', {
            duration: 3000,
            panelClass: 'notif-success',
          });
        },
        () => {
          this.snackbar.open('Update Failed.', 'x', {
            duration: 3000,
            panelClass: 'notif-error',
          });
        }
      );
    }
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  getAllUsers() {
    this.sfaService._userService.getAllUserDetails().subscribe((response) => {
      if (response) {
        this.users = response;
      }
    });
  }

  getSingleStore(storeId: number) {
    this.sfaService._storeService
      .getSingleStore(storeId)
      .subscribe((response) => {
        if (response) {
          this.defaults = response;
          this.buildForm();
        }
      });
  }

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

  getAllRoutes() {
    this.sfaService._routeService.getAllRoutes().subscribe((response) => {
      if (response) {
        this.routes = response;
      }
    });
  }

  AddEmail() {
    this.defaults.storeEmails.push({} as StoreEmail);
    (<FormArray>this.form.get('storeEmails')).push(
      this.fb.group({ id: 0, email: null })
    );
  }

  RemoveEmail(id: number) {
    if (this.defaults.storeEmails.length > 1) {
      this.defaults.storeEmails.splice(id, 1);
    }

    if ((<FormArray>this.form.get('storeEmails')).length > 1) {
      (<FormArray>this.form.get('storeEmails')).removeAt(id);
    }
  }

  AddContact() {
    this.defaults.storeContacts.push({} as StoreContact);
    (<FormArray>this.form.get('storeContacts')).push(
      this.fb.group({ id: 0, contactNo: null })
    );
  }

  RemoveContact(id: number) {
    if (this.defaults.storeContacts.length > 1) {
      this.defaults.storeContacts.splice(id, 1);
    }

    if ((<FormArray>this.form.get('storeContacts')).length > 1) {
      (<FormArray>this.form.get('storeContacts')).removeAt(id);
    }
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
