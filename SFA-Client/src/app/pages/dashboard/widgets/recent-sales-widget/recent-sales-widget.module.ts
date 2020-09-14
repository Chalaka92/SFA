import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SFACardModule } from '../../../../../@sfa/shared/card/card.module';
import { ListModule } from '../../../../../@sfa/shared/list/list.module';
import { LoadingOverlayModule } from '../../../../../@sfa/shared/loading-overlay/loading-overlay.module';
import { MaterialModule } from '../../../../../@sfa/shared/material-components.module';
import { RecentSalesWidgetTableComponent } from './recent-sales-widget-table/recent-sales-widget-table.component';
import { RecentSalesWidgetComponent } from './recent-sales-widget.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    // Core
    LoadingOverlayModule,
    SFACardModule,
    ListModule,
    ChartsModule
  ],
  declarations: [RecentSalesWidgetComponent, RecentSalesWidgetTableComponent],
  exports: [RecentSalesWidgetComponent]
})
export class RecentSalesWidgetModule {
}
