export class SalesRepItemBatch {
  id: number;
  userId: number;
  salesRepName: string;
  itemBatchId: number;
  itemBatchName: string;
  itemCount: number;
  storeId: number;
  storeName: number;

  constructor(salesRepItemBatch) {
    this.id = salesRepItemBatch.id;
    this.userId = salesRepItemBatch.userId;
    this.salesRepName = salesRepItemBatch.salesRepName;
    this.itemBatchId = salesRepItemBatch.itemBatchId;
    this.itemBatchName = salesRepItemBatch.itemBatchName;
    this.itemCount = salesRepItemBatch.itemCount;
    this.storeId = salesRepItemBatch.storeId;
    this.storeName = salesRepItemBatch.storeName;
  }
}
