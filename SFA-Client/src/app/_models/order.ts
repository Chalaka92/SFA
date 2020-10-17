import { OrderItemBatch } from './orderItemBatch';

export class Order {
  id: number;
  shopId: number;
  shopName: string;
  userId: number;
  salesRepName: string;
  orderCode: string;
  totalAmount: number;
  isComplete: boolean;
  completedDate: Date;
  orderedDate: Date;
  isEdit: boolean;
  editedDate: Date;
  editedUserId: number;
  isCancel: boolean;
  canceledDate: Date;
  canceledUserId: number;
  canceledReason: string;
  isSync: boolean;
  syncedDate: Date;
  loginEmail: string;
  orderItemBatches: OrderItemBatch[];

  constructor(order) {
    this.id = order.id;
    this.shopId = order.shopId;
    this.shopName = order.shopName;
    this.userId = order.userId;
    this.salesRepName = order.salesRepName;
    this.orderCode = order.orderCode;
    this.totalAmount = order.totalAmount;
    this.isComplete = order.isComplete;
    this.completedDate = order.completedDate;
    this.orderedDate = order.orderedDate;
    this.isEdit = order.isEdit;
    this.editedDate = order.editedDate;
    this.editedUserId = order.editedUserId;
    this.isCancel = order.isCancel;
    this.canceledDate = order.canceledDate;
    this.canceledUserId = order.canceledUserId;
    this.canceledReason = order.canceledReason;
    this.isSync = order.isSync;
    this.syncedDate = order.syncedDate;
    this.orderItemBatches = order.orderItemBatches;
  }
}
