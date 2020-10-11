import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderItemBatchRoutingModule } from './order-item-batch-routing.module';
import { OrderItemBatchComponent } from './order-item-batch.component';


@NgModule({
  declarations: [OrderItemBatchComponent],
  imports: [
    CommonModule,
    OrderItemBatchRoutingModule
  ]
})
export class OrderItemBatchModule { }
