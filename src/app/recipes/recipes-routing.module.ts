import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipesPage} from './recipes.page';

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
		path: 'editor',
		loadChildren: () => import('./editor/editor.module').then(m => m.EditorPageModule)
	}

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class RecipesPageRoutingModule {
}
