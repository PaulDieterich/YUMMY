import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PlansPage} from './plans.page';

const routes: Routes = [
	{
		path: '',
		component: PlansPage
	},
	{
		path: 'editor',
		loadChildren: () => import('./editor/editor.module').then(m => m.EditorPageModule)
	},
	{
		path: 'detail',
		loadChildren: () => import('./detail/detail.module').then(m => m.DetailPageModule)
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PlansPageRoutingModule {
}
