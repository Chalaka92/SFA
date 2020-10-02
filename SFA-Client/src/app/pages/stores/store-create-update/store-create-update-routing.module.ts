import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreCreateUpdateComponent } from './store-create-update.component';

const routes: Routes = [
  {
    path: '',
    component: StoreCreateUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreCreateUpdateRoutingModule {}
