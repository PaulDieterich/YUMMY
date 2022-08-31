import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EditorPage} from './editor.page';

const routes: Routes = [
	{
		path: '',
		component: EditorPage
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class EditorPageRoutingModule {
}
