import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoresRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from '@app/common/confirm-dialog/confirm-dialog.module';
import { SfaSharedModule } from 'src/@sfa/sfa-shared.module';
import { BreadcrumbsModule } from 'src/@sfa/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@sfa/shared/list/list.module';
import { MaterialModule } from 'src/@sfa/shared/material-components.module';
import { StoreCreateUpdateModule } from './store-create-update/store-create-update.module';

@NgModule({
  declarations: [StoreComponent],
  imports: [
    CommonModule,
    StoresRoutingModule,
    MaterialModule,
    SfaSharedModule,
    ListModule,
    ReactiveFormsModule,
    BreadcrumbsModule,
    ConfirmDialogModule,
    StoreCreateUpdateModule,
  ],
})
export class StoreModule {}