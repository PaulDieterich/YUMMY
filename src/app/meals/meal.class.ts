import {Recipe} from '../recipes/recipe.class';
import {Ingredient} from '../recipes/ingredient.class';
import {Entity} from '../entity.class';

export class Meal implements Entity {

	public id: number;
	public name: string;
	public readonly images: Array<string>;
	public user: string;
	public readonly recipes: Array<Recipe>;
	public readonly ingredients: Array<Ingredient>;

	constructor() {
		this.id = -1;
		this.name = '';
		this.images = new Array<string>();
		this.user = '';
		this.recipes = new Array<Recipe>();
		this.ingredients = new Array<Ingredient>();
	}

	getId(): number {
		return this.id;
	}
}

export enum MealAttribute {
	id = 'id',
	name = 'name',
	images = 'images',
	user = 'user'
}
