import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SfaSharedModule } from 'src/@sfa/sfa-shared.module';
import { SFACardModule } from 'src/@sfa/shared/card/card.module';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { ShopCreateUpdateRoutingModule } from './shop-create-update-routing.module';
import { ShopCreateUpdateComponent } from './shop-create-update.component';

@NgModule({
  imports: [
    CommonModule,
    SfaSharedModule,
    SFACardModule,
    MatSelectModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    ShopCreateUpdateRoutingModule,
    MatGridListModule,
  ],
  declarations: [ShopCreateUpdateComponent],
})
export class ShopCreateUpdateModule {}
