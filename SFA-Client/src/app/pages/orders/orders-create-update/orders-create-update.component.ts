import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ItemBatch } from '@app/_models/itemBatch';
import { Order } from '@app/_models/order';
import { SalesRep } from '@app/_models/salesRep';
import { Shop } from '@app/_models/shop';
import { AuthService } from '@app/_services/auth.service';
import { SfaService } from '@app/_services/sfa.service';
import { fadeInRightAnimation } from 'src/@sfa/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@sfa/animations/fade-in-up.animation';

@Component({
  selector: 'sfa-orders-create-update',
  templateUrl: './orders-create-update.component.html',
  styleUrls: ['./orders-create-update.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation],
})
export class OrdersCreateUpdateComponent implements OnInit {
  form: FormGroup;

  mode: 'create' | 'update' = 'create';
  shops: Shop[];
  defaults: Order;
  orderId: number;
  salesReps: SalesRep[];
  itemBatches: ItemBatch[];

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
    this.getAllShops();
    this.getAllSalesReps();
    this.getAllItemBatches();

    this.activatedRoute.params.subscribe((params) => {
      this.orderId = params['orderId'];
      if (this.orderId) {
        this.getSingleOrder(this.orderId);
        this.mode = 'update';
      } else {
        this.defaults = {} as Order;
        this.buildForm();
      }
    });
  }

  buildForm() {
    // create a form group for each item in the model
    // const addressFormGroups = this.defaults.orderAddresses.map((x) =>
    //   this.fb.group({
    //     id: this.fb.control(x.id || 0),
    //     address1: this.fb.control(x.address1),
    //     address2: this.fb.control(x.address2),
    //     address3: this.fb.control(x.address3),
    //     districtId: this.fb.control(x.districtId),
    //     salesRepId: this.fb.control(x.salesRepId),
    //     locationLatitude: this.fb.control(x.locationLatitude),
    //     locationLongitude: this.fb.control(x.locationLongitude),
    //   })
    // );
    // const emailFormGroups = this.defaults.orderEmails.map((x) =>
    //   this.fb.group({
    //     id: this.fb.control(x.id || 0),
    //     email: this.fb.control(x.email),
    //   })
    // );
    // const contactFormGroups = this.defaults.orderContacts.map((x) =>
    //   this.fb.group({
    //     id: this.fb.control(x.id || 0),
    //     contactNo: this.fb.control(x.contactNo),
    //   })
    // );

    // create a form array for the groups
    // const emailFormArray = this.fb.array(emailFormGroups);
    // const contactFormArray = this.fb.array(contactFormGroups);
    // const addressFormArray = this.fb.array(addressFormGroups);

    this.form = this.fb.group({
      shopId: [this.defaults.shopId || null],
      salesRepId: [this.defaults.salesRepId || null],
      orderCode: [this.defaults.orderCode || null],
      totalAmount: [this.defaults.totalAmount || null],
      isComplete: [this.defaults.isComplete || null],
      completedDate: [this.defaults.completedDate || null],
      orderedDate: [this.defaults.orderedDate || null],
      isEdit: [this.defaults.isEdit || null],
      editedDate: [this.defaults.editedDate || null],
      isCancel: [this.defaults.isCancel || null],
      canceledDate: [this.defaults.canceledDate || null],
      canceledReason: [this.defaults.canceledReason || null],
      isSync: [this.defaults.isSync || null],
      syncedDate: [this.defaults.syncedDate || null],
      // orderEmails: emailFormArray,
      // orderContacts: contactFormArray,
      // orderAddresses: addressFormArray,
    });
  }

  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${
      this._gap - this._gap / colAmount
    }px)`;
  }

  save() {
    if (this.mode === 'create') {
      this.createOrder();
    } else if (this.mode === 'update') {
      this.updateOrder();
    }
  }

  createOrder() {
    const order: Order = this.form.value;
    order.loginEmail = this.authService.currentUserValue.email;

    if (order) {
      this.sfaService._orderService.createOrder(order).subscribe(
        () => {
          this.snackbar.open('User Creation Successful', 'x', {
            duration: 3000,
            panelClass: 'notif-success',
          });
        },
        (error) => {
          console.log(error);
          this.snackbar.open('User Creation Failed', 'x', {
            duration: 3000,
            panelClass: 'notif-error',
          });
        }
      );
    }
  }

  updateOrder() {
    const order: Order = this.form.value;
    order.id = this.orderId;
    if (order) {
      this.sfaService._orderService
        .updateOrder(order.id, order)
        .subscribe(() => {
          this.snackbar.open('Update Successful', 'x', {
            duration: 3000,
            panelClass: 'notif-success',
          });
        });
    }
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  getAllShops() {
    this.sfaService._shopService.getAllShops().subscribe((response) => {
      if (response) {
        this.shops = response;
      }
    });
  }

  getAllSalesReps() {
    this.sfaService._salesRepService.getAllSalesReps().subscribe((response) => {
      if (response) {
        this.salesReps = response;
      }
    });
  }

  getAllItemBatches() {
    this.sfaService._itemBatchService
      .getAllItemBatches()
      .subscribe((response) => {
        if (response) {
          this.itemBatches = response;
        }
      });
  }

  getSingleOrder(orderId: number) {
    this.sfaService._orderService
      .getSingleOrder(orderId)
      .subscribe((response) => {
        if (response) {
          this.defaults = response;
          this.buildForm();
        }
      });
  }
}
