import { SalesRep } from './salesRep';

export class SalesRepGroupByUserId {
  userId: number;
  userName: string;
  salesRepDtos: SalesRep[];

  constructor(salesRep) {
    this.userId = salesRep.userId;
    this.salesRepDtos = salesRep.salesRepDtos;
  }
}
