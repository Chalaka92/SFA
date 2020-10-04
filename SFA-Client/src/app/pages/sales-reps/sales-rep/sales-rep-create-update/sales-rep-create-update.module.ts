import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesRepCreateUpdateComponent } from './sales-rep-create-update.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MapsWidgetModule } from '@app/pages/routes/route/maps-widget/maps-widget.module';
import { SFACardModule } from 'src/@sfa/shared/card/card.module';

@NgModule({
  imports: [
    CommonModule,
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
  declarations: [SalesRepCreateUpdateComponent],
  entryComponents: [SalesRepCreateUpdateComponent],
  exports: [SalesRepCreateUpdateComponent],
})
export class SalesRepCreateUpdateModule {}
