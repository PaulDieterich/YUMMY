import {Entity} from '../common/entity.class';
import {Ingredient} from './ingredient.class';

export class Recipe implements Entity {

	public id: number;
	public name: string;
	public readonly images: Array<string>;
	public readonly instructions: Array<string>;
	public time?: number;
	public source: string;
	public readonly tags: Array<string>;
	public readonly ingredients: Array<Ingredient>;

	constructor() {
		this.id = -1;
		this.name = '';
		this.images = [];
		this.instructions = [];
		this.source = '';
		this.tags = [];
		this.ingredients = [];
	}

	getId(): number {
		return this.id;
	}

	public apply(recipe: Recipe) {
		this.id = recipe.id;
		this.name = recipe.name;
		this.images.splice(0, this.images.length, ...recipe.images);
		this.instructions.splice(0, this.instructions.length, ...recipe.instructions);
		this.time = recipe.time;
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
