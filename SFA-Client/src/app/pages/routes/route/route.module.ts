import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteRoutingModule } from './route-routing.module';
import { RouteComponent } from './route.component';
import { MaterialModule } from 'src/@sfa/shared/material-components.module';
import { SfaSharedModule } from 'src/@sfa/sfa-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../../../@sfa/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@sfa/shared/list/list.module';
import { RouteCreateUpdateModule } from './route-create-update/route-create-update.module';
import { ConfirmDialogModule } from '@app/common/confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [RouteComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SfaSharedModule,
    RouteRoutingModule,
    ReactiveFormsModule,
    ListModule,
    RouteCreateUpdateModule,
    ConfirmDialogModule,
    BreadcrumbsModule,
    FormsModule,
  ],
})
export class RouteModule {}
