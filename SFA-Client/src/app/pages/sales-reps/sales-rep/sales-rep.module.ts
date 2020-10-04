import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRepRoutingModule } from './sales-rep-routing.module';
import { SalesRepComponent } from './sales-rep.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from '@app/common/confirm-dialog/confirm-dialog.module';
import { SfaSharedModule } from 'src/@sfa/sfa-shared.module';
import { BreadcrumbsModule } from 'src/@sfa/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@sfa/shared/list/list.module';
import { MaterialModule } from 'src/@sfa/shared/material-components.module';
import { SalesRepCreateUpdateModule } from './sales-rep-create-update/sales-rep-create-update.module';

@NgModule({
  declarations: [SalesRepComponent],
  imports: [
    CommonModule,
    SalesRepRoutingModule,
    MaterialModule,
    SfaSharedModule,
    ListModule,
    ReactiveFormsModule,
    BreadcrumbsModule,
    SalesRepCreateUpdateModule,
    ConfirmDialogModule,
  ],
})
export class SalesRepModule {}
