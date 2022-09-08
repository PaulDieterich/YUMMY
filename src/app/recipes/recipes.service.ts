import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {ApiService} from '../api.service';
import {Recipe, RecipeAttribute} from './recipe.class';

@Injectable({
	providedIn: 'root'
})
export class RecipesService extends ApiService<Recipe, RecipeAttribute> {

	constructor(http: HttpClient) {
		super(http, '/recipes');
	}
}
