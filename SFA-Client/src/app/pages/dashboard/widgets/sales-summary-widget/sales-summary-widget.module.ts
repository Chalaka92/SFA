import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SFACardModule } from '../../../../../@sfa/shared/card/card.module';
import { LoadingOverlayModule } from '../../../../../@sfa/shared/loading-overlay/loading-overlay.module';
import { MaterialModule } from '../../../../../@sfa/shared/material-components.module';
import { SalesSummaryWidgetComponent } from './sales-summary-widget.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    // Core
    LoadingOverlayModule,
    SFACardModule,
    ChartsModule
  ],
  declarations: [SalesSummaryWidgetComponent],
  exports: [SalesSummaryWidgetComponent]
})
export class SalesSummaryWidgetModule {
}
