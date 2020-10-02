import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemBatchRoutingModule } from './item-batch-routing.module';
import { ItemBatchComponent } from './item-batch.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from '@app/common/confirm-dialog/confirm-dialog.module';
import { SfaSharedModule } from 'src/@sfa/sfa-shared.module';
import { BreadcrumbsModule } from 'src/@sfa/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@sfa/shared/list/list.module';
import { MaterialModule } from 'src/@sfa/shared/material-components.module';
import { ItemBatchCreateUpdateModule } from './item-batch-create-update/item-batch-create-update.module';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [ItemBatchComponent],
  imports: [
    CommonModule,
    ItemBatchRoutingModule,
    MaterialModule,
    SfaSharedModule,
    ListModule,
    ReactiveFormsModule,
    BreadcrumbsModule,
    ItemBatchCreateUpdateModule,
    ConfirmDialogModule,
    FormsModule,
  ],
  providers: [DatePipe],
})
export class ItemBatchModule {}
