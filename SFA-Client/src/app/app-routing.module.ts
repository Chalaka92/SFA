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
