import {Recipe} from '../recipes/recipe.class';
import {Ingredient} from '../recipes/ingredient.class';
import {Entity} from '../entity.class';

export class Meal implements Entity {

	private id: number;
	private name: string;
	private images: string[];
	private user: string;
	private recipes: Recipe[];
	private ingredients: Ingredient[];

	constructor() {
		this.id = -1;
		this.name = '';
		this.images = [];
		this.user = '';
		this.recipes = [];
		this.ingredients = [];
	}

	getId(): number {
		return this.id;
	}

	setId(id: number): void {
		this.id = id;
	}

	getName(): string {
		return this.name;
	}

	setName(name: string): void {
		this.name = name;
	}

	getImages(): string[] {
		return this.images;
	}

	setImages(images: string[]): void {
		this.images = images;
	}

	getUser(): string {
		return this.user;
	}

	setUser(user: string): void {
		this.user = user;
	}

	getRecipes(): Recipe[] {
		return this.recipes;
	}

	setRecipes(recipes: Recipe[]): void {
		this.recipes = recipes;
	}

	getIngredients(): Ingredient[] {
		return this.ingredients;
	}

	setIngredients(ingredients: Ingredient[]): void {
		this.ingredients = ingredients;
	}
}

export enum MealAttribute {
	id = 'id',
	name = 'name',
	images = 'images',
	user = 'user'
}
