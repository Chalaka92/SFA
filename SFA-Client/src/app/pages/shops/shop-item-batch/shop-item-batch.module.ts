import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopItemBatchRoutingModule } from './shop-item-batch-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from '@app/common/confirm-dialog/confirm-dialog.module';
import { SfaSharedModule } from 'src/@sfa/sfa-shared.module';
import { BreadcrumbsModule } from 'src/@sfa/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@sfa/shared/list/list.module';
import { MaterialModule } from 'src/@sfa/shared/material-components.module';
import { ShopItemBatchCreateUpdateModule } from './shop-item-batch-create-update/shop-item-batch-create-update.module';
import { ShopItemBatchComponent } from './shop-item-batch.component';

@NgModule({
  declarations: [ShopItemBatchComponent],
  imports: [
    CommonModule,
    ShopItemBatchRoutingModule,
    MaterialModule,
    SfaSharedModule,
    ListModule,
    ReactiveFormsModule,
    BreadcrumbsModule,
    ShopItemBatchCreateUpdateModule,
    ConfirmDialogModule,
    FormsModule,
  ],
})
export class ShopItemBatchModule {}
