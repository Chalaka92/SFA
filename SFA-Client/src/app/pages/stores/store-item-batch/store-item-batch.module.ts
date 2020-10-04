import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreItemBatchRoutingModule } from './store-item-batch-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from '@app/common/confirm-dialog/confirm-dialog.module';
import { SfaSharedModule } from 'src/@sfa/sfa-shared.module';
import { BreadcrumbsModule } from 'src/@sfa/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@sfa/shared/list/list.module';
import { MaterialModule } from 'src/@sfa/shared/material-components.module';
import { StoreItemBatchCreateUpdateModule } from './store-item-batch-create-update/store-item-batch-create-update.module';
import { StoreItemBatchComponent } from './store-item-batch.component';

@NgModule({
  declarations: [StoreItemBatchComponent],
  imports: [
    CommonModule,
    StoreItemBatchRoutingModule,
    MaterialModule,
    SfaSharedModule,
    ListModule,
    ReactiveFormsModule,
    BreadcrumbsModule,
    StoreItemBatchCreateUpdateModule,
    ConfirmDialogModule,
    FormsModule,
  ],
})
export class StoreItemBatchModule {}
