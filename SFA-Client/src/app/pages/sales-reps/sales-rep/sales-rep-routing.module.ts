import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesRepComponent } from './sales-rep.component';

const routes: Routes = [
  {
    path: '',
    component: SalesRepComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesRepRoutingModule {}
