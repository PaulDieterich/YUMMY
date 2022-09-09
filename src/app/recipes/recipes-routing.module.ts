import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipesPage} from './recipes.page';
import {DetailPage} from './detail/detail.page';
import {EditorPage} from './editor/editor.page';

const routes: Routes = [
	{
		path: '',
		component: RecipesPage,
	},
	{
		path: 'detail',
		loadChildren: () => import('./detail/detail.module').then(m => m.DetailPageModule)
	},
	{
		path: 'detail/:id',
		loadChildren: () => import('./detail/detail.module').then(m => m.DetailPageModule)
	},
	{
		path: 'editor',
		loadChildren: () => import('./editor/editor.module').then(m => m.EditorPageModule)
	},{
		path: 'create',
		loadChildren: () => import('./create/create.module').then(m => m.CreatePageModule)
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
export class RecipesPageRoutingModule {
}
