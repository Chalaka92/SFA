export class SalesRep {
  id: number;
  userId: number;
  userName: string;
  salesRepCode: string;
  assignedStoreId: number;
  assignedStoreName: string;
  assignedAreaId: number;
  assignedAreaName: string;

  constructor(salesRep) {
    this.id = salesRep.id;
    this.userId = salesRep.userId;
    this.userName = salesRep.userName;
    this.salesRepCode = salesRep.salesRepCode;
    this.assignedStoreId = salesRep.assignedStoreId;
    this.assignedStoreName = salesRep.assignedStoreName;
    this.assignedAreaId = salesRep.assignedAreaId;
    this.assignedAreaName = salesRep.assignedAreaName;
  }
}
