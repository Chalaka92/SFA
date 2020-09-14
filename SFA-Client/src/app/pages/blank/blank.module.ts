import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlankRoutingModule } from './blank-routing.module';
import { BlankComponent } from './blank.component';
import { SfaSharedModule } from '../../../@sfa/sfa-shared.module';

@NgModule({
  imports: [
    CommonModule,
    BlankRoutingModule,
    SfaSharedModule
  ],
  declarations: [BlankComponent]
})
export class BlankModule {
}
