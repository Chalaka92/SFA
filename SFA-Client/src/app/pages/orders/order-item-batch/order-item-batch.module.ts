import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderItemBatchRoutingModule } from './order-item-batch-routing.module';
import { OrderItemBatchComponent } from './order-item-batch.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from '@app/common/confirm-dialog/confirm-dialog.module';
import { SfaSharedModule } from 'src/@sfa/sfa-shared.module';
import { BreadcrumbsModule } from 'src/@sfa/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@sfa/shared/list/list.module';
import { MaterialModule } from 'src/@sfa/shared/material-components.module';
import { OrderItemBatchCreateUpdateModule } from './order-item-batch-create-update/order-item-batch-create-update.module';

@NgModule({
  declarations: [OrderItemBatchComponent],
  imports: [
    CommonModule,
    OrderItemBatchRoutingModule,
    MaterialModule,
    SfaSharedModule,
    ListModule,
    ReactiveFormsModule,
    BreadcrumbsModule,
    OrderItemBatchCreateUpdateModule,
    ConfirmDialogModule,
    FormsModule,
  ],
})
export class OrderItemBatchModule {}
