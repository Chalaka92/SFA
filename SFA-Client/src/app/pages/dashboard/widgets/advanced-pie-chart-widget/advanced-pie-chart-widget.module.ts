import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SFACardModule } from '../../../../../@sfa/shared/card/card.module';
import { LoadingOverlayModule } from '../../../../../@sfa/shared/loading-overlay/loading-overlay.module';
import { MaterialModule } from '../../../../../@sfa/shared/material-components.module';
import { ScrollbarModule } from '../../../../../@sfa/shared/scrollbar/scrollbar.module';
import { AdvancedPieChartWidgetComponent } from './advanced-pie-chart-widget.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    // Core
    SFACardModule,
    LoadingOverlayModule,
    ScrollbarModule,
    ChartsModule
  ],
  declarations: [AdvancedPieChartWidgetComponent],
  exports: [AdvancedPieChartWidgetComponent]
})
export class AdvancedPieChartWidgetModule {
}
