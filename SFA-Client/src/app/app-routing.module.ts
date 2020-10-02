import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'apps/dashboard',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'routes/route',
        loadChildren: () =>
          import('./pages/routes/route/route.module').then(
            (m) => m.RouteModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'routes/area',
        loadChildren: () =>
          import('./pages/routes/area/area.module').then((m) => m.AreaModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'routes/district',
        loadChildren: () =>
          import('./pages/routes/district/district.module').then(
            (m) => m.DistrictModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'routes/province',
        loadChildren: () =>
          import('./pages/routes/province/province.module').then(
            (m) => m.ProvinceModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./pages/users/users.module').then((m) => m.UsersModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'userregistration',
        loadChildren: () =>
          import('./pages/user-registration/user-registration.module').then(
            (m) => m.UserRegistrationModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'shops/shop',
        loadChildren: () =>
          import('./pages/shops/shop/shop.module').then((m) => m.ShopModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'shops/shopcategory',
        loadChildren: () =>
          import('./pages/shops/shop-category/shop-category.module').then(
            (m) => m.ShopCategoryModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'statuses/status',
        loadChildren: () =>
          import('./pages/statuses/status/status.module').then(
            (m) => m.StatusModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'statuses/statustype',
        loadChildren: () =>
          import('./pages/statuses/status-type/status-type.module').then(
            (m) => m.StatusTypeModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'stores',
        loadChildren: () =>
          import('./pages/stores/stores.module').then((m) => m.StoresModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'items/item',
        loadChildren: () =>
          import('./pages/items/item/item.module').then((m) => m.ItemModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'items/itemcategory',
        loadChildren: () =>
          import('./pages/items/item-category/item-category.module').then(
            (m) => m.ItemCategoryModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'items/itembatch',
        loadChildren: () =>
          import('./pages/items/item-batch/item-batch.module').then(
            (m) => m.ItemBatchModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'salesreps',
        loadChildren: () =>
          import('./pages/sales-reps/sales-reps.module').then(
            (m) => m.SalesRepsModule
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      // preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
