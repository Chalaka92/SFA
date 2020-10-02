import { District } from './district';

export class UserDetail {
  id: number;
  roleId: number;
  roleName: number;
  userCode: string;
  firstName: string;
  middleName: string;
  lastName: string;
  birthday: string;
  nic: string;
  createdDate: Date;
  createdBy: string;
  loginEmail: string;
  displayAddress: string;
  loggedUserId: string;
  userAddresses: UserAddress[];
  userEmails: UserEmail[];
  userContacts: UserContact[];

  constructor(userDetail) {
    this.id = userDetail.id;
    this.roleId = userDetail.roleId;
    this.userCode = userDetail.userCode;
    this.firstName = userDetail.firstName;
    this.middleName = userDetail.middleName;
    this.lastName = userDetail.lastName;
    this.birthday = userDetail.birthday;
    this.nic = userDetail.nic;
    this.createdDate = userDetail.createdDate;
    this.createdBy = userDetail.createdBy;
    this.loginEmail = userDetail.loginEmail;
    this.userAddresses = userDetail.userAddresses;
    this.userEmails = userDetail.userEmails;
    this.userContacts = userDetail.userContacts;
    this.displayAddress = userDetail.displayAddress;
    this.loggedUserId = userDetail.loggedUserId;
  }
}

export interface UserAddress {
  id: number;
  userId: number;
  provinceId: number;
  districtId: number;
  address1: string;
  address2: string;
  address3: string;
  locationLatitude: number;
  locationLongitude: number;

  // constructor(userAddress) {
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

export interface UserEmail {
  id: number;
  email: string;
  userId: number;

  // constructor(userEmail) {
  //   this.id = userEmail.id;
  //   this.email = userEmail.email;
  //   this.userId = userEmail.userId;
  // }
}

export interface UserContact {
  id: number;
  contactNo: string;
  userId: number;

  // constructor(userContact) {
  //   this.id = userContact.id;
  //   this.contactNo = userContact.contactNo;
  //   this.userId = userContact.userId;
  // }
}
