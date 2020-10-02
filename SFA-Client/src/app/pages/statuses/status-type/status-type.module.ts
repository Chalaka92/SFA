import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusTypeRoutingModule } from './status-type-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from '@app/common/confirm-dialog/confirm-dialog.module';
import { SfaSharedModule } from 'src/@sfa/sfa-shared.module';
import { BreadcrumbsModule } from 'src/@sfa/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@sfa/shared/list/list.module';
import { MaterialModule } from 'src/@sfa/shared/material-components.module';
import { StatusTypeCreateUpdateModule } from './status-type-create-update/status-type-create-update.module';
import { StatusTypeComponent } from './status-type.component';

@NgModule({
  declarations: [StatusTypeComponent],
  imports: [
    CommonModule,
    StatusTypeRoutingModule,
    MaterialModule,
    SfaSharedModule,
    ListModule,
    ReactiveFormsModule,
    BreadcrumbsModule,
    StatusTypeCreateUpdateModule,
    ConfirmDialogModule,
  ],
})
export class StatusTypeModule {}
