import {Meal} from '../meals/meal.class';
import {Entity} from '../entity.class';

export class Plan implements Entity {

	private id: number;
	private name: string;
	private user: string;
	private meals: Meal[];

	constructor() {
		this.id = -1;
		this.name = '';
		this.user = '';
		this.meals = [];
	}


	getId(): number {
		return this.id;
	}

	setId(value: number): void {
		this.id = value;
	}

	getName(): string {
		return this.name;
	}

	setName(value: string): void {
		this.name = value;
	}

	getUser(): string {
		return this.user;
	}

	setUser(value: string): void {
		this.user = value;
	}

	getMeals(): Meal[] {
		return this.meals;
	}

	setMeals(value: Meal[]): void {
		this.meals = value;
	}
}

export enum PlanAttribute {
	id = 'id',
	name = 'name',
	user = 'user'
}
