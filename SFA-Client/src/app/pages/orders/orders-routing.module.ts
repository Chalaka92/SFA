import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/_helpers/auth.guard';
import { OrdersComponent } from './orders.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
  },
  {
    path: '',
    children: [
      {
        path: 'createUpdateOrder',
        loadChildren: () =>
          import('./orders-create-update/orders-create-update.module').then(
            (m) => m.OrdersCreateUpdateModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'createUpdateOrder/:orderId',
        loadChildren: () =>
          import('./orders-create-update/orders-create-update.module').then(
            (m) => m.OrdersCreateUpdateModule
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
