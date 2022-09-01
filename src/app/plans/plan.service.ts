import {Injectable} from '@angular/core';
import {PlanFilter} from './list/filter.class';
import {Plan} from './plan.class';
import {Request} from '../api';

@Injectable({
	providedIn: 'root'
})
export class PlanService {

	// Ruft Zeitpläne aus der API ab und persistiert diese auf 3 Ebenen:
	// - Ebenen 1: Online (keine Persistenz)
	// - Ebenen 2: Cache (Persistiert in lokaler Variable)
	// - Ebenen 3: Favoriten (Persistiert in LocalStorage, bisher nicht implementiert)

	private lists = new Map<PlanFilter[], Plan[]>();
	private plans = new Map<number, Plan>();

	listPlans(filters: PlanFilter[]): Promise<Plan[]> {
		return this.computeIfAbsentAsync(this.lists, filters, async () => {
			const request = new Request();
			filters.forEach(filter => {
				request.queryParam(filter.getAttribute(), filter.getFilter() + ':' + filter.getValue());
			});
			const response = await request.get('/plans');
			return response.body<Plan[]>();
		});
	}

	getPlan(id: number): Promise<Plan> {
		return this.computeIfAbsentAsync(this.plans, id, async () => {
			const request = new Request();
			const response = await request.get('/plans/{id}', id);
			return response.body<Plan>();
		});
	}

	createPlan(plan: Plan): Promise<Plan> {
		const promise = new Promise<Plan>((resolve, reject) => {
			const request = new Request();
			request.body(plan);
			request.post('/plans').then(response => {
				resolve(response.body<Plan>());
			});
		});
		promise.then(this.updateCache);
		return promise;
	}

	updatePlan(plan: Plan): Promise<Plan> {
		const promise = new Promise<Plan>((resolve, reject) => {
			const request = new Request();
			request.body(plan);
			request.put('/plans/{id}', plan.getId()).then(response => {
				resolve(response.body<Plan>());
			});
		});
		promise.then(this.updateCache);
		return promise;
	}

	deletePlan(id: number): Promise<boolean> {
		const promise = new Promise<boolean>((resolve, reject) => {
			const request = new Request();
			request.delete('/plans/{id}', id).then(response => {
				resolve(response.statusCode === 200);
			});
		});
		promise.then(success => {
			if (success) {
				this.deleteCache(id);
			}
		});
		return promise;
	}

	private computeIfAbsentAsync<K, V>(map: Map<K, V>, key: K, value: () => Promise<V>): Promise<V> {
		if (!map.has(key)) {
			return new Promise<V>((resolve, reject) => {
				value().then(val => map.set(key, val));
			});
		} else {
			return Promise.resolve(map.get(key));
		}
	}

	private updateCache(plan: Plan) {
		// Add or update plan in local cache
		this.plans.set(plan.getId(), plan);
		// Iterate through all filtered lists and update the plan if it is in there
		this.lists.forEach((plans, filters) => {
			const index = plans.findIndex(p => plan.getId() === p.getId());
			if (index !== -1) {
				plans[index] = plan;
				this.lists.set(filters, plans);
			}
		});
	}

	private deleteCache(id: number) {
		// Remove plan in local cache
		this.plans.delete(id);
		// Iterate through all filtered lists and remove the plan if it is in there
		this.lists.forEach((plans, filters) => {
			const index = plans.findIndex(p => id === p.getId());
			if (index !== -1) {
				plans.splice(index, 1);
				this.lists.set(filters, plans);
			}
		});
	}
}
