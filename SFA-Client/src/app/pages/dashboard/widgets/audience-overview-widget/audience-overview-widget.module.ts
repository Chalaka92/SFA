import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SFACardModule } from '../../../../../@sfa/shared/card/card.module';
import { LoadingOverlayModule } from '../../../../../@sfa/shared/loading-overlay/loading-overlay.module';
import { MaterialModule } from '../../../../../@sfa/shared/material-components.module';
import { AudienceOverviewWidgetComponent } from './audience-overview-widget.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,

    // Core
    LoadingOverlayModule,
    SFACardModule,
    ChartsModule,
  ],
  declarations: [AudienceOverviewWidgetComponent],
  exports: [AudienceOverviewWidgetComponent]
})
export class AudienceOverviewWidgetModule {
}
