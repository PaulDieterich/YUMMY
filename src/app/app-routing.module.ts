import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
	{
		path: 'tabs/',
		loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesPageModule)
	},
	{
		path: 'recipes',
		loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesPageModule)
	},
	{
		path: 'meals',
		loadChildren: () => import('./meals/meals.module').then(m => m.MealsPageModule)
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
