import {Injectable} from '@angular/core';
import {Service} from '../api.service';
import {Plan, PlanAttribute} from './plan.class';

@Injectable({
	providedIn: 'root'
})
export class PlanService extends Service<Plan, PlanAttribute> {

	constructor() {
		super('/v3/plans');
	}
}
