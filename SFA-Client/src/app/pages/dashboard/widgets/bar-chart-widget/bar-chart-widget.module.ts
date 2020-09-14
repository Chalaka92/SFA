import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingOverlayModule } from '../../../../../@sfa/shared/loading-overlay/loading-overlay.module';
import { MaterialModule } from '../../../../../@sfa/shared/material-components.module';
import { BarChartWidgetComponent } from './bar-chart-widget.component';
import { SFACardModule } from '../../../../../@sfa/shared/card/card.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    // Core
    LoadingOverlayModule,

    // Chart Widget Style
    SFACardModule,
    ChartsModule
  ],
  declarations: [BarChartWidgetComponent],
  exports: [BarChartWidgetComponent]
})
export class BarChartWidgetModule {
}
