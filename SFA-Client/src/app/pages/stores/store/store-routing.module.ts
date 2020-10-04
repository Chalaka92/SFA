import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/_helpers/auth.guard';
import { StoreComponent } from './store.component';

const routes: Routes = [
  {
    path: '',
    component: StoreComponent,
  },
  {
    path: '',
    children: [
      {
        path: 'createUpdateStore',
        loadChildren: () =>
          import('./store-create-update/store-create-update.module').then(
            (m) => m.StoreCreateUpdateModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'createUpdateStore/:storeId',
        loadChildren: () =>
          import('./store-create-update/store-create-update.module').then(
            (m) => m.StoreCreateUpdateModule
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
export class StoresRoutingModule {}
