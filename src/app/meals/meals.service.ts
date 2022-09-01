import {Injectable} from '@angular/core';
import {Service} from '../api.service';
import {Meal, MealAttribute} from './meal.class';

@Injectable({
	providedIn: 'root'
})
export class MealsService extends Service<Meal, MealAttribute> {

	constructor() {
		super('/v2/meals');
	}
}
