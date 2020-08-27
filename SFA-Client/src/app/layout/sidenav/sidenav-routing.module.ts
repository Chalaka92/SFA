import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './sidenav.component';
import { AuthGuard } from '@app/_helpers/auth.guard';
import { LayoutComponent } from '../layout.component';

const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'apps/dashboard',
        loadChildren: () =>
          import('../../pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
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
export class SidenavRoutingModule {}
