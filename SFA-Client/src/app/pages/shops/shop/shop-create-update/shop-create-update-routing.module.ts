import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '@app/layout/layout.component';
import { AuthGuard } from '@app/_helpers/auth.guard';
import { ShopCreateUpdateComponent } from './shop-create-update.component';

const routes: Routes = [
  {
    path: '',
    component: ShopCreateUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopCreateUpdateRoutingModule {}
