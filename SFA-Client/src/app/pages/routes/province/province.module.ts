import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvinceRoutingModule } from './province-routing.module';
import { ProvinceComponent } from './province.component';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { ListModule } from 'src/@fury/shared/list/list.module';
import { ProvinceCreateUpdateComponent } from './province-create-update/province-create-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsModule } from 'src/@fury/shared/breadcrumbs/breadcrumbs.module';

@NgModule({
  declarations: [ProvinceComponent],
  imports: [
    CommonModule,
    ProvinceRoutingModule,
    MaterialModule,
    FurySharedModule,
    ListModule,
    ProvinceCreateUpdateComponent,
    ReactiveFormsModule,
    BreadcrumbsModule,
  ],
})
export class ProvinceModule {}
