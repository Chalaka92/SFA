import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRepsRoutingModule } from './sales-reps-routing.module';
import { SalesRepsComponent } from './sales-reps.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from '@app/common/confirm-dialog/confirm-dialog.module';
import { SfaSharedModule } from 'src/@sfa/sfa-shared.module';
import { BreadcrumbsModule } from 'src/@sfa/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@sfa/shared/list/list.module';
import { MaterialModule } from 'src/@sfa/shared/material-components.module';
import { SalesRepsCreateUpdateModule } from './sales-reps-create-update/sales-reps-create-update.module';

@NgModule({
  declarations: [SalesRepsComponent],
  imports: [
    CommonModule,
    SalesRepsRoutingModule,
    MaterialModule,
    SfaSharedModule,
    ListModule,
    ReactiveFormsModule,
    BreadcrumbsModule,
    SalesRepsCreateUpdateModule,
    ConfirmDialogModule,
  ],
})
export class SalesRepsModule {}
