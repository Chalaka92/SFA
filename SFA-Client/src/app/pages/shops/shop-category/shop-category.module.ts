import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopCategoryRoutingModule } from './shop-category-routing.module';
import { ShopCategoryComponent } from './shop-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from '@app/common/confirm-dialog/confirm-dialog.module';
import { SfaSharedModule } from 'src/@sfa/sfa-shared.module';
import { BreadcrumbsModule } from 'src/@sfa/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from 'src/@sfa/shared/list/list.module';
import { MaterialModule } from 'src/@sfa/shared/material-components.module';
import { ShopCategoryCreateUpdateModule } from './shop-category-create-update/shop-category-create-update.module';

@NgModule({
  declarations: [ShopCategoryComponent],
  imports: [
    CommonModule,
    ShopCategoryRoutingModule,
    MaterialModule,
    SfaSharedModule,
    ListModule,
    ReactiveFormsModule,
    BreadcrumbsModule,
    ShopCategoryCreateUpdateModule,
    ConfirmDialogModule,
  ],
})
export class ShopCategoryModule {}
