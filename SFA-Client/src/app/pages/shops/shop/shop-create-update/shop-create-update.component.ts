import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { DistrictService } from '@app/pages/routes/district/district.service';
import { ProvinceService } from '@app/pages/routes/province/province.service';
import { UsersService } from '@app/pages/users/users.service';
import { District } from '@app/_models/district';
import { Province } from '@app/_models/province';
import { ShopCategory } from '@app/_models/shopCategory';
import { ShopAddress, ShopContact, Shop, ShopEmail } from '@app/_models/shop';
import { AuthService } from '@app/_services/auth.service';
import { fadeInRightAnimation } from 'src/@sfa/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@sfa/animations/fade-in-up.animation';
import { ShopCategoryService } from '../../shop-category/shop-category.service';
import { ShopService } from '../shop.service';
import { UserDetail } from '@app/_models/userDetails';
import { Status } from '@app/_models/status';
import { StatusService } from '@app/pages/statuses/status/status.service';
import { Route } from '@app/_models/route';
import { RouteService } from '@app/pages/routes/route/route.service';
import { SfaService } from '@app/_services/sfa.service';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'sfa-shop-create-update',
  templateUrl: './shop-create-update.component.html',
  styleUrls: ['./shop-create-update.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class ShopCreateUpdateComponent implements OnInit {
  form: FormGroup;

  mode: 'create' | 'update' = 'create';
  users: UserDetail[];
  defaults: Shop;
  shopId: number;
  provinces: Province[];
  districts: District[];
  selectedProvince: Province;
  shopCategories: ShopCategory[];
  statuses: Status[];
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
    this.getAllShopCategories();
    this.getAllStatuses();
    this.getAllRoutes();

    this.activatedRoute.params.subscribe((params) => {
      this.shopId = params['shopId'];
      if (this.shopId) {
        this.getSingleShop(this.shopId);
        this.mode = 'update';
      } else {
        this.defaults = {} as Shop;

        this.defaults.shopEmails = [] as ShopEmail[];
        this.defaults.shopEmails.push({} as ShopEmail);

        this.defaults.shopContacts = [] as ShopContact[];
        this.defaults.shopContacts.push({} as ShopContact);

        this.defaults.shopAddresses = [] as ShopAddress[];
        this.defaults.shopAddresses.push({} as ShopAddress);

        this.buildForm();
      }
    });
  }

  buildForm() {
    // create a form group for each item in the model
    const addressFormGroups = this.defaults.shopAddresses.map((x) =>
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
    const emailFormGroups = this.defaults.shopEmails.map((x) =>
      this.fb.group({
        id: this.fb.control(x.id || 0),
        email: this.fb.control(x.email),
      })
    );
    const contactFormGroups = this.defaults.shopContacts.map((x) =>
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
      routeId: [this.defaults.routeId || 0],
      shopOwnerId: [this.defaults.shopOwnerId || null],
      shopCategoryId: [this.defaults.shopCategoryId || null],
      statusId: [this.defaults.statusId || null],
      shopCode: [this.defaults.shopCode || null],
      name: [this.defaults.name || null],
      comment: [this.defaults.comment || null],
      arrearsAmount: [this.defaults.arrearsAmount || null],
      shopEmails: emailFormArray,
      shopContacts: contactFormArray,
      shopAddresses: addressFormArray,
    });
  }

  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${
      this._gap - this._gap / colAmount
    }px)`;
  }

  save() {
    if (this.mode === 'create') {
      this.createShop();
    } else if (this.mode === 'update') {
      this.updateShop();
    }
  }

  createShop() {
    const shop: Shop = this.form.value;
    shop.createdDate = new Date();
    shop.loginEmail = this.authService.currentUserValue.email;

    if (shop) {
      this.sfaService._shopService.createShop(shop).subscribe(
        () => {
          this.snackbar.open('Shop Creation Successful.', 'x', {
            duration: 3000,
            panelClass: 'notif-success',
          });
        },
        (error) => {
          console.log(error);
          this.snackbar.open('Shop Creation Failed.', 'x', {
            duration: 3000,
            panelClass: 'notif-error',
          });
        }
      );
    }
  }

  updateShop() {
    const shop: Shop = this.form.value;
    shop.id = this.shopId;
    if (shop) {
      this.sfaService._shopService.updateShop(shop.id, shop).subscribe(
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

  getAllShopCategories() {
    this.sfaService._shopCategoryService
      .getAllShopCategories()
      .subscribe((response) => {
        if (response) {
          this.shopCategories = response;
        }
      });
  }

  getAllStatuses() {
    this.sfaService._statusService.getAllStatuses().subscribe((response) => {
      if (response) {
        this.statuses = response;
      }
    });
  }

  getSingleShop(shopId: number) {
    this.sfaService._shopService.getSingleShop(shopId).subscribe((response) => {
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
    this.defaults.shopEmails.push({} as ShopEmail);
    (<FormArray>this.form.get('shopEmails')).push(
      this.fb.group({ id: 0, email: null })
    );
  }

  RemoveEmail(id: number) {
    if (this.defaults.shopEmails.length > 1) {
      this.defaults.shopEmails.splice(id, 1);
    }

    if ((<FormArray>this.form.get('shopEmails')).length > 1) {
      (<FormArray>this.form.get('shopEmails')).removeAt(id);
    }
  }

  AddContact() {
    this.defaults.shopContacts.push({} as ShopContact);
    (<FormArray>this.form.get('shopContacts')).push(
      this.fb.group({ id: 0, contactNo: null })
    );
  }

  RemoveContact(id: number) {
    if (this.defaults.shopContacts.length > 1) {
      this.defaults.shopContacts.splice(id, 1);
    }

    if ((<FormArray>this.form.get('shopContacts')).length > 1) {
      (<FormArray>this.form.get('shopContacts')).removeAt(id);
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
