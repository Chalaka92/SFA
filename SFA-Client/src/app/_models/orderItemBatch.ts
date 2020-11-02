export class OrderItemBatch {
  id: number;
  orderId: number;
  itemBatchId: string;
  orderItemBatchCode: number;
  name: string;
  itemCount: number;
  sellingToShopOwnerAmount: number;
  shopOwnerProfitAmount: number;
  companyProfitAmount: number;
  companyDiscountRate: number;
  shopOwnerDiscountRate: number;
  isSpecialDiscountHave: boolean;
  customerFreeIssueQuantity: number;
  shopOwnerFreeIssueQuantity: number;

  constructor(orderItemBatch) {
    this.id = orderItemBatch.id;
    this.orderId = orderItemBatch.orderId;
    this.itemBatchId = orderItemBatch.itemBatchId;
    this.orderItemBatchCode = orderItemBatch.orderItemBatchCode;
    this.name = orderItemBatch.name;
    this.itemCount = orderItemBatch.itemCount;
    this.sellingToShopOwnerAmount = orderItemBatch.sellingToShopOwnerAmount;
    this.shopOwnerProfitAmount = orderItemBatch.shopOwnerProfitAmount;
    this.companyProfitAmount = orderItemBatch.companyProfitAmount;
    this.companyDiscountRate = orderItemBatch.companyDiscountRate;
    this.shopOwnerDiscountRate = orderItemBatch.shopOwnerDiscountRate;
    this.isSpecialDiscountHave = orderItemBatch.isSpecialDiscountHave;
    this.customerFreeIssueQuantity = orderItemBatch.customerFreeIssueQuantity;
    this.shopOwnerFreeIssueQuantity = orderItemBatch.shopOwnerFreeIssueQuantity;
  }
}