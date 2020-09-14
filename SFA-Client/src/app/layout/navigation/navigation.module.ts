import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { SfaSharedModule } from '../../../@sfa/sfa-shared.module';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';

@NgModule({
  imports: [
    CommonModule,
    SfaSharedModule
  ],
  declarations: [NavigationComponent, NavigationItemComponent],
  exports: [NavigationComponent]
})
export class NavigationModule {
}
