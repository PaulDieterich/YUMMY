import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealsPage } from './meals.page';

const routes: Routes = [
  {
    path: '',
    component: MealsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealsPageRoutingModule {}
