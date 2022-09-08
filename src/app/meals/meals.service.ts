import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {ApiService} from '../api.service';
import {Meal, MealAttribute} from './meal.class';

@Injectable({
	providedIn: 'root'
})
export class MealsService extends ApiService<Meal, MealAttribute> {

	constructor(http: HttpClient) {
		super(http, '/meals');
	}
}
