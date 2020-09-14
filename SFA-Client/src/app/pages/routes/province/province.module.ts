import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProvinceRoutingModule } from './province-routing.module';
import { ProvinceComponent } from './province.component';
import { MaterialModule } from 'src/@sfa/shared/material-components.module';
import { SfaSharedModule } from 'src/@sfa/sfa-shared.module';
import { ListModule } from 'src/@sfa/shared/list/list.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsModule } from 'src/@sfa/shared/breadcrumbs/breadcrumbs.module';
import { ProvinceCreateUpdateModule } from './province-create-update/province-create-update.module';
import { ConfirmDialogModule } from '@app/common/confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [ProvinceComponent],
  imports: [
    CommonModule,
    ProvinceRoutingModule,
    MaterialModule,
    SfaSharedModule,
    ListModule,
    ReactiveFormsModule,
    BreadcrumbsModule,
    ProvinceCreateUpdateModule,
    ConfirmDialogModule,
  ],
})
export class ProvinceModule {}
