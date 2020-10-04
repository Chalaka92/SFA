import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersCreateUpdateComponent } from './orders-create-update.component';
import { OrdersCreateUpdateRoutingModule } from './orders-create-update-routing.module';

@NgModule({
  imports: [CommonModule, OrdersCreateUpdateRoutingModule],
  declarations: [OrdersCreateUpdateComponent],
})
export class OrdersCreateUpdateModule {}
