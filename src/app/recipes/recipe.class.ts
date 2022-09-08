import {Entity} from '../entity.class';
import {Ingredient} from './ingredient.class';

export class Recipe implements Entity {

	private id: number;
	private name: string;
	private instructions: string[];
	private ingredients: Ingredient[];
	private preparationTime?: string;
	private cookingTime?: string;
	private source: string;
	private tags: string;
	private image: string;
	private variantOf?: number;

	constructor() {
		this.id = -1;
		this.name = '';
		this.instructions = [];
		this.ingredients = [];
		this.source = '';
		this.tags = '';
		this.image = ''; 
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

	getInstructions(): string[] {
		return this.instructions;
	}

	setInstructions(instructions: string[]): void {
		this.instructions = instructions;
	}

	getIngredients(): Ingredient[] {
		return this.ingredients;
	}

	setIngredients(ingredients: Ingredient[]): void {
		this.ingredients = ingredients;
	}

	getPreparationTime(): string {
		return this.preparationTime;
	}

	setPreparationTime(preparationTime: string): void {
		this.preparationTime = preparationTime;
	}

	getCookingTime(): string {
		return this.cookingTime;
	}

	setCookingTime(cookingTime: string): void {
		this.cookingTime = cookingTime;
	}

	getSource(): string {
		return this.source;
	}

	setSource(source: string): void {
		this.source = source;
	}

	getTags(): string {
		return this.tags;
	}

	setTags(tags: string): void {
		this.tags = tags;
	}

	getVariantOf(): number {
		return this.variantOf;
	}

	setVariantOf(variantOf: number): void {
		this.variantOf = variantOf;
	}
	getImage(): string{
		return this.image;
	}
	setImage(image: string): void{
		this.image = image;
	}
}

export enum RecipeAttribute {
	id = 'id',
	name = 'name',
	instructions = 'instructions',
	preparationTime = 'preparationTime',
	cookingTime = 'cookingTime',
	source = 'source',
	tags = 'tags',
	variantOf = 'variantOf'
}
