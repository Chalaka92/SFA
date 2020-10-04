export class ShopItemBatch {
  id: number;
  shopId: number;
  shopName: string;
  itemBatchId: number;
  itemBatchName: string;

  constructor(shopItemBatch) {
    this.id = shopItemBatch.id;
    this.shopId = shopItemBatch.shopId;
    this.shopName = shopItemBatch.shopName;
    this.itemBatchId = shopItemBatch.itemBatchId;
    this.itemBatchName = shopItemBatch.itemBatchName;
  }
}
