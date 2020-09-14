import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BackdropModule } from '../../@sfa/shared/backdrop/backdrop.module';
import { LoadingIndicatorModule } from '../../@sfa/shared/loading-indicator/loading-indicator.module';
import { MaterialModule } from '../../@sfa/shared/material-components.module';
import { FooterModule } from './footer/footer.module';
import { LayoutComponent } from './layout.component';
import { QuickpanelModule } from './quickpanel/quickpanel.module';
import { SidenavModule } from './sidenav/sidenav.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { ConfigPanelModule } from './config-panel/config-panel.module';
import { SfaSharedModule } from '../../@sfa/sfa-shared.module';
import { NavigationModule } from './navigation/navigation.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    LoadingIndicatorModule,
    SfaSharedModule,

    // Core
    ToolbarModule,
    QuickpanelModule,
    SidenavModule,
    FooterModule,
    BackdropModule,
    ConfigPanelModule,
    NavigationModule
  ],
  declarations: [LayoutComponent]
})
export class LayoutModule {
}
