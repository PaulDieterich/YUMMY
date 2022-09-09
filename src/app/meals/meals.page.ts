import {Component, OnChanges, OnInit} from '@angular/core';

import {Filter, FilterType} from '../list/util.class';
import {Meal, MealAttribute} from './meal.class';

import {MealsService} from './meals.service';

@Component({
	selector: 'app-meals',
	templateUrl: 'meals.page.html',
	styleUrls: ['meals.page.scss']
})
export class MealsPage implements OnInit, OnChanges {

	public filter = new Filter<MealAttribute>(MealAttribute.name, FilterType.contains, '');
	public meals = new Array<Meal>();

	constructor(private service: MealsService) { }

	// Keep ngOnInit() until we figure out,
	// why ngOnChanges() isn't called on page load
	ngOnInit() {
		this.ngOnChanges();
	}

	ngOnChanges() {
		if (this.filter.value && this.filter.value.length > 0) {
			this.service.list([this.filter]).subscribe(data => {
				this.meals = data;
			});
		} else {
			this.service.list().subscribe(data => {
				this.meals = data;
			});
		}
	}
}
