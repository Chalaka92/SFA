import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/_helpers/auth.guard';
import { ShopComponent } from './shop.component';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
  },
  {
    path: '',
    children: [
      {
        path: 'createUpdateShop',
        loadChildren: () =>
          import('./shop-create-update/shop-create-update.module').then(
            (m) => m.ShopCreateUpdateModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'createUpdateShop/:shopId',
        loadChildren: () =>
          import('./shop-create-update/shop-create-update.module').then(
            (m) => m.ShopCreateUpdateModule
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
export class ShopRoutingModule {}
