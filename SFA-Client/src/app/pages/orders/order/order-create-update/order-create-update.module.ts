import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderCreateUpdateRoutingModule } from './order-create-update-routing.module';
import { OrderCreateUpdateComponent } from './order-create-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { SfaSharedModule } from 'src/@sfa/sfa-shared.module';
import { SFACardModule } from 'src/@sfa/shared/card/card.module';
import { MaterialModule } from 'src/@sfa/shared/material-components.module';

@NgModule({
  declarations: [OrderCreateUpdateComponent],
  imports: [
    CommonModule,
    OrderCreateUpdateRoutingModule,
    SfaSharedModule,
    SFACardModule,
    MatSelectModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MaterialModule,
  ],
})
export class OrderCreateUpdateModule {}
