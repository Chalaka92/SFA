import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreItemBatchComponent } from './store-item-batch.component';

const routes: Routes = [
  {
    path: '',
    component: StoreItemBatchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreItemBatchRoutingModule {}
