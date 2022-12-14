import {Injectable} from '@angular/core';

import {ApiService} from '../common/api.service';
import {HttpClient} from '@angular/common/http';
import {Meal, MealAttribute} from './meal.class';
import {Filter, Sorter, Pagination} from '../common/list.class';
import {Observable} from 'rxjs';
import {API} from '../common/api.class';
import {Recipe} from '../recipes/recipe.class';
import {Ingredient} from '../recipes/ingredient.class';

@Injectable({
	providedIn: 'root'
})
export class MealsService {

	private service: ApiService<Meal, MealAttribute>;

	constructor(private http: HttpClient) {
		this.service = new ApiService<Meal, MealAttribute>(http, '/meals');
	}

	auth(user: string, password: string): MealsService {
		this.service.auth(user, password);
		return this;
	}

	list(filters?: Filter<MealAttribute>[], sorter?: Sorter<MealAttribute>[], pagination?: Pagination): Observable<Meal[]> {
		return this.service.list(filters, sorter, pagination);
	}

	get(id: number): Observable<Meal> {
		return new Observable<Meal>(observer => {
			const meal = new Meal();
			let count = 0;

			this.service.get(id).subscribe(data => {
				meal.apply(data);
				if (++count === 3) {
					observer.next(meal);
					observer.complete();
				}
			});

			new API<Recipe[]>(this.http).get('/meals/{id}/recipes', id).subscribe(data => {
				if (data) {
					meal.recipes.splice(0, meal.recipes.length, ...data);
				}

				if (++count === 3) {
					observer.next(meal);
					observer.complete();
				}
			});

			new API<Ingredient[]>(this.http).get('/meals/{id}/ingredients', id).subscribe(data => {
				if (data) {
					meal.ingredients.splice(0, meal.ingredients.length, ...data);
				}
				if (++count === 3) {
					observer.next(meal);
					observer.complete();
				}
			});
		});
	}

	create(meal: Meal): Observable<Meal> {
		return new Observable<Meal>(observer => {
			let count = 0;
			const target = meal.recipes.length + meal.ingredients.length + 1;

			this.service
				.create(meal)
				.subscribe(data => {
					meal.apply(data);

					meal.recipes.filter(recipe => recipe.id > 0).forEach(recipe => {
						new API<Recipe>(this.http)
							.auth(this.service.user, this.service.password)
							.queryParam('recipeId', recipe.id)
							.post('/meals/{mealId}/recipes', meal.id)
							.subscribe(_ => {
								if (++count === target) {
									observer.next(meal);
									observer.complete();
								}
							});
					});

					if (++count === target) {
						observer.next(meal);
						observer.complete();
					}
				});
		});
	}

	update(meal: Meal): Observable<Meal> {
		return new Observable<Meal>(observer => {
			let count = 0;
			const target = meal.recipes.length + meal.ingredients.length + 3;

			this.service.update(meal).subscribe(data => {
				meal.apply(data);

				new API(this.http)
					.auth(this.service.user, this.service.password)
					.delete('/meals/{id}/recipes', meal.id)
					.subscribe(_ => {
						++count;
						meal.recipes.filter(recipe => recipe.id > 0).forEach(recipe => {
							new API<Recipe>(this.http)
								.auth(this.service.user, this.service.password)
								.post('/meals/{mealId}/recipes/{recipeId}', meal.id, recipe.id)
								.subscribe(__ => {
									if (++count === target) {
										observer.next(meal);
										observer.complete();
									}
								});
						});
					});

				if (++count === target) {
					observer.next(meal);
					observer.complete();
				}
			});
		});
	}

	delete(meal: Meal): Observable<boolean> {
		return this.service.delete(meal.id);
	}
}
