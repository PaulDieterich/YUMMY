import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DetailPage} from './detail.page';

const routes: Routes = [
	{
		path: '',
		component: DetailPage
	},{
		path: 'editor/:id',
		loadChildren: () => import('../editor/editor.module').then(m => m.EditorPageModule)
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DetailPageRoutingModule {
}
