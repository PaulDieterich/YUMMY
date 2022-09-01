import {Injectable} from '@angular/core';
import {Service} from '../api.service';
import {Recipe, RecipeAttribute} from './recipe.class';

@Injectable({
	providedIn: 'root'
})
export class RecipesService extends Service<Recipe, RecipeAttribute> {

	constructor() {
		super('/v1/recipes');
	}
}
