import { Recipe } from '../recipes/recipe.class';
import {Entity} from './entity.class';

export class User implements Entity {

    public id: number;
    public name: string;
    public role: string;
    public password: string;
    public readonly recipes: Array<Recipe>;
    constructor() {
        this.id = -1;
        this.name = '';
        this.role = '';
        this.password = '';
    }
    getId(): number {
        return this.id;
        throw new Error('Method not implemented.');
    }
    public apply(user: User) {
		this.id = user.id;
        this.name = user.name;
        this.role = user.role;
        this.password = user.password;
        this.recipes.splice(0, this.recipes.length, ...user.recipes);
	}
}
export enum UserAttribute {
	id = 'id',
	name = 'name',
	role = 'role',
    recipe = 'recipe'
}
