import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesRepItemBatchComponent } from './sales-rep-item-batch.component';

const routes: Routes = [
  {
    path: '',
    component: SalesRepItemBatchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesRepItemBatchRoutingModule {}
