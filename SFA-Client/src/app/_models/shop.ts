import { District } from './district';

export class Shop {
  id: number;
  routeId: number;
  routeName: string;
  statusId: number;
  shopCategoryId: number;
  shopOwnerId: number;
  shopOwnerName: string;
  shopCode: string;
  name: string;
  comment: string;
  shopCategoryName: string;
  displayAddress: string;
  createdDate: Date;
  createdBy: string;
  loginEmail: string;
  arrearsAmount: number;
  shopAddresses: ShopAddress[];
  shopEmails: ShopEmail[];
  shopContacts: ShopContact[];

  constructor(shop) {
    this.id = shop.id;
    this.routeId = shop.routeId;
    this.routeName = shop.routeName;
    this.statusId = shop.statusId;
    this.shopCategoryId = shop.shopCategoryId;
    this.shopOwnerId = shop.shopOwnerId;
    this.shopOwnerName = shop.shopOwnerName;
    this.shopCode = shop.shopCode;
    this.name = shop.name;
    this.comment = shop.comment;
    this.shopCategoryName = shop.shopCategoryName;
    this.displayAddress = shop.displayAddress;
    this.createdBy = shop.createdBy;
    this.createdDate = shop.createdDate;
    this.loginEmail = shop.loginEmail;
    this.shopAddresses = shop.shopAddresses;
    this.shopEmails = shop.shopEmails;
    this.shopContacts = shop.shopContacts;
    this.arrearsAmount = shop.arrearsAmount;
  }
}

export interface ShopAddress {
  id: number;
  shopId: number;
  provinceId: number;
  districtId: number;
  address1: string;
  address2: string;
  address3: string;
  locationLatitude: number;
  locationLongitude: number;

  // constructor(shopAddress) {
  //   this.id = userAddress.id;
  //   this.userId = userAddress.userId;
  //   this.provinceId = userAddress.provinceId;
  //   this.districtId = userAddress.districtId;
  //   this.address1 = userAddress.address1;
  //   this.address2 = userAddress.address2;
  //   this.address3 = userAddress.address3;
  //   this.locationLatitude = userAddress.locationLatitude;
  //   this.locationLongitude = userAddress.locationLongitude;
  // }
}

export interface ShopEmail {
  id: number;
  email: string;
  shopId: number;

  // constructor(userEmail) {
  //   this.id = userEmail.id;
  //   this.email = userEmail.email;
  //   this.shopId = userEmail.shopId;
  // }
}

export interface ShopContact {
  id: number;
  contactNo: string;
  userId: number;

  // constructor(userContact) {
  //   this.id = userContact.id;
  //   this.contactNo = userContact.contactNo;
  //   this.userId = userContact.userId;
  // }
}
