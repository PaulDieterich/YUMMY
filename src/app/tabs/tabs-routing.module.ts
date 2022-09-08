import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
	{
		path: 'tabs',
		component: TabsPage,
		children: [
			{
				path: 'recipes',
				loadChildren: () => import('../recipes/recipes.module').then(m => m.RecipesPageModule)
			},
			{
				path: 'meals',
				loadChildren: () => import('../meals/meals.module').then(m => m.MealsPageModule)
			},
			{
				path: '',
				redirectTo: '/recipes',
				pathMatch: 'full'
			}
		]
	},
	{
		path: '',
		redirectTo: '/recipes',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {
}
