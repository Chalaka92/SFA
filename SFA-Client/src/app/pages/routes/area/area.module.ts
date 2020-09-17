import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaRoutingModule } from './area-routing.module';
import { AreaComponent } from './area.component';
import { MaterialModule } from 'src/@sfa/shared/material-components.module';
import { SfaSharedModule } from 'src/@sfa/sfa-shared.module';
import { ListModule } from 'src/@sfa/shared/list/list.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsModule } from 'src/@sfa/shared/breadcrumbs/breadcrumbs.module';
import { ConfirmDialogModule } from '@app/common/confirm-dialog/confirm-dialog.module';
import { AreaCreateUpdateModule } from './area-create-update/area-create-update.module';

@NgModule({
  declarations: [AreaComponent],
  imports: [
    CommonModule,
    AreaRoutingModule,
    MaterialModule,
    SfaSharedModule,
    ListModule,
    ReactiveFormsModule,
    BreadcrumbsModule,
    AreaCreateUpdateModule,
    ConfirmDialogModule,
    FormsModule,
  ],
})
export class AreaModule {}
