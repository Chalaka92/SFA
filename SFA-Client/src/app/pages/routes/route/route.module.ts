import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteRoutingModule } from './route-routing.module';
import { RouteComponent } from './route.component';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { CustomerCreateUpdateModule } from './customer-create-update/customer-create-update.module';

@NgModule({
  declarations: [RouteComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FurySharedModule,
    RouteRoutingModule,
    ReactiveFormsModule,
    ListModule,
    CustomerCreateUpdateModule,
    BreadcrumbsModule,
  ],
})
export class RouteModule {}
