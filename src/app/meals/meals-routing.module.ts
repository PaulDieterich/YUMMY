import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MealsPage} from './meals.page';
import {DetailPage} from './detail/detail.page';
import {EditorPage} from './editor/editor.page';

const routes: Routes = [
	{
		path: '',
		component: MealsPage
	},
	{
		path: ':id',
		component: DetailPage
	},
	{
		path: 'create',
		component: EditorPage
	},
	{
		path: ':id/edit',
		component: EditorPage
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MealsPageRoutingModule { }
