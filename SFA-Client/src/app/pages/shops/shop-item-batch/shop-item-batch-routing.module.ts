import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopItemBatchComponent } from './shop-item-batch.component';

const routes: Routes = [
  {
    path: '',
    component: ShopItemBatchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopItemBatchRoutingModule {}
