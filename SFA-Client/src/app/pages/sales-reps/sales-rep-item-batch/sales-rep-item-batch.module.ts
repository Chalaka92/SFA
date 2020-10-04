import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRepItemBatchRoutingModule } from './sales-rep-item-batch-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from '@app/common/confirm-dialog/confirm-dialog.module';
import { SfaSharedModule } from 'src/@sfa/sfa-shared.module';
import { BreadcrumbsModule } from 'src/@sfa/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@sfa/shared/list/list.module';
import { MaterialModule } from 'src/@sfa/shared/material-components.module';
import { SalesRepItemBatchCreateUpdateModule } from './sales-rep-item-batch-create-update/sales-rep-item-batch-create-update.module';
import { SalesRepItemBatchComponent } from './sales-rep-item-batch.component';

@NgModule({
  declarations: [SalesRepItemBatchComponent],
  imports: [
    CommonModule,
    SalesRepItemBatchRoutingModule,
    MaterialModule,
    SfaSharedModule,
    ListModule,
    ReactiveFormsModule,
    BreadcrumbsModule,
    SalesRepItemBatchCreateUpdateModule,
    ConfirmDialogModule,
    FormsModule,
  ],
})
export class SalesRepItemBatchModule {}
