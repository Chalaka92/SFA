import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusRoutingModule } from './status-routing.module';
import { StatusComponent } from './status.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from '@app/common/confirm-dialog/confirm-dialog.module';
import { SfaSharedModule } from 'src/@sfa/sfa-shared.module';
import { BreadcrumbsModule } from 'src/@sfa/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@sfa/shared/list/list.module';
import { MaterialModule } from 'src/@sfa/shared/material-components.module';
import { StatusCreateUpdateModule } from './status-create-update/status-create-update.module';

@NgModule({
  declarations: [StatusComponent],
  imports: [
    CommonModule,
    StatusRoutingModule,
    MaterialModule,
    SfaSharedModule,
    ListModule,
    ReactiveFormsModule,
    BreadcrumbsModule,
    StatusCreateUpdateModule,
    ConfirmDialogModule,
    FormsModule,
  ],
})
export class StatusModule {}
