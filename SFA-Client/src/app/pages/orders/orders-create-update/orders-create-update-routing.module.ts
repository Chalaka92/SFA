import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersCreateUpdateComponent } from './orders-create-update.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersCreateUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersCreateUpdateRoutingModule {}
