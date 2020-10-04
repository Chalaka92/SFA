import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreCreateUpdateComponent } from './store-create-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { SFACardModule } from 'src/@sfa/shared/card/card.module';
import { StoreCreateUpdateRoutingModule } from './store-create-update-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { SfaSharedModule } from 'src/@sfa/sfa-shared.module';

@NgModule({
  imports: [
    CommonModule,
    SfaSharedModule,
    SFACardModule,
    MatSelectModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    StoreCreateUpdateRoutingModule,
    MatGridListModule,
  ],
  declarations: [StoreCreateUpdateComponent],
})
export class StoreCreateUpdateModule {}
