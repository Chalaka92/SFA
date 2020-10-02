import { District } from './district';

export class Store {
  id: number;
  routeId: number;
  routeName: string;
  storeManagerId: number;
  storeManagerName: string;
  storeCode: string;
  name: string;
  comment: string;
  displayAddress: string;
  createdDate: Date;
  createdBy: string;
  loginEmail: string;
  storeAddresses: StoreAddress[];
  storeEmails: StoreEmail[];
  storeContacts: StoreContact[];

  constructor(store) {
    this.id = store.id;
    this.routeId = store.routeId;
    this.routeName = store.routeName;
    this.storeManagerId = store.storeManagerId;
    this.storeManagerName = store.storeManagerName;
    this.storeCode = store.storeCode;
    this.name = store.name;
    this.comment = store.comment;
    this.displayAddress = store.displayAddress;
    this.createdBy = store.createdBy;
    this.createdDate = store.createdDate;
    this.loginEmail = store.loginEmail;
    this.storeAddresses = store.storeAddresses;
    this.storeEmails = store.storeEmails;
    this.storeContacts = store.storeContacts;
  }
}

export interface StoreAddress {
  id: number;
  storeId: number;
  provinceId: number;
  districtId: number;
  address1: string;
  address2: string;
  address3: string;
  locationLatitude: number;
  locationLongitude: number;
}

export interface StoreEmail {
  id: number;
  email: string;
  storeId: number;
}

export interface StoreContact {
  id: number;
  contactNo: string;
  storeId: number;
}
