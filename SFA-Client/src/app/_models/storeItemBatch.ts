export class StoreItemBatch {
  id: number;
  storeId: number;
  storeName: string;
  itemBatchId: number;
  itemBatchName: string;
  itemCount: number;

  constructor(storeItemBatch) {
    this.id = storeItemBatch.id;
    this.storeId = storeItemBatch.storeId;
    this.storeName = storeItemBatch.storeName;
    this.itemBatchId = storeItemBatch.itemBatchId;
    this.itemBatchName = storeItemBatch.itemBatchName;
    this.itemCount = storeItemBatch.itemCount;
  }
}
