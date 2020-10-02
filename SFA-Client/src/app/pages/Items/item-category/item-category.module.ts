import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemCategoryRoutingModule } from './item-category-routing.module';
import { ItemCategoryComponent } from './item-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from '@app/common/confirm-dialog/confirm-dialog.module';
import { SfaSharedModule } from 'src/@sfa/sfa-shared.module';
import { BreadcrumbsModule } from 'src/@sfa/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@sfa/shared/list/list.module';
import { MaterialModule } from 'src/@sfa/shared/material-components.module';
import { ItemCategoryCreateUpdateModule } from './item-category-create-update/item-category-create-update.module';

@NgModule({
  declarations: [ItemCategoryComponent],
  imports: [
    CommonModule,
    ItemCategoryRoutingModule,
    MaterialModule,
    SfaSharedModule,
    ListModule,
    ReactiveFormsModule,
    BreadcrumbsModule,
    ConfirmDialogModule,
    ItemCategoryCreateUpdateModule,
  ],
})
export class ItemCategoryModule {}
