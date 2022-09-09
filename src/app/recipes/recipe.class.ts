import {Entity} from '../entity.class';
import {Ingredient} from './ingredient.class';

export class Recipe implements Entity {

	public id: number;
	public name: string;
	public readonly images: Array<string>;
	public instructions: Map<number,string>;
	public time?: string;
	public source: string;
	public readonly tags: Array<string>;
	public ingredients: Map<number,Ingredient>;

	constructor() {
		this.id = -1;
		this.name = '';
		this.images = [];
		this.instructions = new Map<number,string>();
		this.source = '';
		this.tags = [];
		this.ingredients = new Map<number,Ingredient>();
	}

	getId(): number {
		return this.id;
	}

	public apply(recipe: Recipe) {
		this.id = recipe.id;
		this.name = recipe.name;
		this.images.splice(0, this.images.length, ...recipe.images);
		this.instructions.clear();
		this.ingredients.clear();
		this.source = recipe.source;
		this.tags.splice(0, this.tags.length, ...recipe.tags);
	}
}

export enum RecipeAttribute {
	id = 'id',
	name = 'name',
	instructions = 'instructions',
	time = 'time',
	source = 'source',
	tags = 'tags',
}
