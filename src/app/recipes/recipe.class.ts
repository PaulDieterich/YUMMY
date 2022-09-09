import {Entity} from '../entity.class';
import {Ingredient} from './ingredient.class';

export class Recipe implements Entity {

	public id: number;
	public name: string;
	public readonly images: Array<string>;
	public readonly instructions: Array<string>;
	public readonly ingredients: Array<Ingredient>;
	public time?: string;
	public source: string;
	public readonly tags: Array<string>;

	constructor() {
		this.id = -1;
		this.name = '';
		this.images = new Array<string>();
		this.instructions = new Array<string>();
		this.ingredients = new Array<Ingredient>();
		this.source = '';
		this.tags = [];
	}

	getId(): number {
		return this.id;
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
