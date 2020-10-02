import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopCategoryComponent } from './shop-category.component';

const routes: Routes = [
  {
    path: '',
    component: ShopCategoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopCategoryRoutingModule {}
