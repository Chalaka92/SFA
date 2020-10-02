import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersCreateUpdateComponent } from './users-create-update.component';
import { SfaSharedModule } from 'src/@sfa/sfa-shared.module';
import { SFACardModule } from 'src/@sfa/shared/card/card.module';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersCreateUpdateRoutingModule } from './users-create-update-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  imports: [
    CommonModule,
    SfaSharedModule,
    SFACardModule,
    MatSelectModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    UsersCreateUpdateRoutingModule,
    MatGridListModule,
  ],
  declarations: [UsersCreateUpdateComponent],
})
export class UsersCreateUpdateModule {}
