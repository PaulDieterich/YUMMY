import {Injectable} from '@angular/core';

import {ApiService} from '../api.service';
import {HttpClient} from '@angular/common/http';
import {Recipe, RecipeAttribute} from './recipe.class';
import {Filter, Sorter, Pagination} from '../list/util.class';
import {Observable} from 'rxjs';
import {API} from '../api.class';
import {Ingredient} from './ingredient.class';

@Injectable({
	providedIn: 'root'
})
export class RecipesService {

	private http: HttpClient;
	private service: ApiService<Recipe, RecipeAttribute>;

	constructor(http: HttpClient) {
		this.http = http;
		this.service = new ApiService<Recipe, RecipeAttribute>(http, '/recipes');
	}

	auth(user: string, password: string): RecipesService {
		this.service.auth(user, password);
		return this;
	}

	list(filters?: Filter<RecipeAttribute>[], sorter?: Sorter<RecipeAttribute>[], pagination?: Pagination): Observable<Recipe[]> {
		return this.service.list(filters, sorter, pagination);
	}

	get(id: number): Observable<Recipe> {
		return new Observable<Recipe>(observer => {
			const recipe = new Recipe();
			let count = 0;

			this.service.get(id).subscribe(data => {
				recipe.apply(data);
				if (++count === 2) {
					observer.next(recipe);
					observer.complete();
				}
			});

			new API<Ingredient[]>(this.http).get('/recipes/{id}/ingredients', id).subscribe(data => {
				if (data) {
					recipe.ingredients.splice(0, recipe.ingredients.length, ...data);
				}

				if (++count === 2) {
					observer.next(recipe);
					observer.complete();
				}
			});
		});
	}

	create(recipe: Recipe): Observable<Recipe> {
		return new Observable<Recipe>(observer => {
			let count = 0;
			const target = recipe.ingredients.length + 1;

			recipe.ingredients.forEach(ingredient => {
				new API<Ingredient>(this.http)
					.auth(this.service.user, this.service.password)
					.body(ingredient)
					.post('/recipes/{id}/ingredients', recipe.id, ingredient)
					.subscribe(_ => {
						if (++count === target) {
							observer.next(recipe);
							observer.complete();
						}
					});
			});

			this.service.create(recipe)
				.subscribe(data => {
					recipe.apply(data);
					if (++count === target) {
						observer.next(recipe);
						observer.complete();
					}
				});
		});
	}

	update(recipe: Recipe): Observable<Recipe> {
		return new Observable<Recipe>(observer => {
			let count = 0;
			const target = recipe.ingredients.length + 2;

			new API(this.http)
				.auth(this.service.user, this.service.password)
				.delete('/recipes/{id}/ingredients', recipe.id)
				.subscribe(_ => {
					++count;
					recipe.ingredients.forEach(ingredient => {
						new API<Ingredient>(this.http)
							.auth(this.service.user, this.service.password)
							.body(ingredient)
							.post('/recipes/{id}/ingredients', recipe.id, ingredient)
							.subscribe(__ => {
								if (++count === target) {
									observer.next(recipe);
									observer.complete();
								}
							});
					});
				});

			this.service.update(recipe).subscribe(data => {
				recipe.apply(data);
				if (++count === target) {
					observer.next(recipe);
					observer.complete();
				}
			});
		});
	}

	delete(id: number): Observable<boolean> {
		return this.service.delete(id);
	}
}
