import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RouteCreateUpdateComponent } from './route-create-update.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MapsWidgetModule } from '../maps-widget/maps-widget.module';
import { SFACardModule } from 'src/@sfa/shared/card/card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MapsWidgetModule,
    MatGridListModule,
    SFACardModule,
  ],
  declarations: [RouteCreateUpdateComponent],
  entryComponents: [RouteCreateUpdateComponent],
  exports: [RouteCreateUpdateComponent],
})
export class RouteCreateUpdateModule {}
