import {Component, OnInit} from '@angular/core';
import {Meal} from '../meal.class';
import {ActivatedRoute} from '@angular/router';
import {MealsService} from '../meals.service';

@Component({
	selector: 'app-detail',
	templateUrl: './detail.page.html',
	styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

	meal = new Meal();

	constructor(private service: MealsService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			this.service.get(+params.get('id')).subscribe(data => {
				console.log('Meal', data);
				this.meal = data;
			});
		});
	}
}
