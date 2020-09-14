import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteRoutingModule } from './route-routing.module';
import { RouteComponent } from './route.component';
import { MaterialModule } from 'src/@sfa/shared/material-components.module';
import { SfaSharedModule } from 'src/@sfa/sfa-shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../../../@sfa/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@sfa/shared/list/list.module';
import { CustomerCreateUpdateModule } from './customer-create-update/customer-create-update.module';

@NgModule({
  declarations: [RouteComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SfaSharedModule,
    RouteRoutingModule,
    ReactiveFormsModule,
    ListModule,
    CustomerCreateUpdateModule,
    BreadcrumbsModule,
  ],
})
export class RouteModule {}
