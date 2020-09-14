import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SFACardModule } from '../../../../../@sfa/shared/card/card.module';
import { MaterialModule } from '../../../../../@sfa/shared/material-components.module';
import { RealtimeUsersWidgetComponent } from './realtime-users-widget.component';
import { ScrollbarModule } from '../../../../../@sfa/shared/scrollbar/scrollbar.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    // Core
    SFACardModule,
    ScrollbarModule
  ],
  declarations: [RealtimeUsersWidgetComponent],
  exports: [RealtimeUsersWidgetComponent]
})
export class RealtimeUsersWidgetModule {
}
