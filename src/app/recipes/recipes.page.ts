import {Component, OnInit} from '@angular/core';
import { RecipesService } from './recipes.service';
import { Recipe, RecipeAttribute } from './recipe.class';
import { Filter } from '../list/filter.class';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
	selector: 'app-recipes',
	templateUrl: 'recipes.page.html',
	styleUrls: ['recipes.page.scss']
})
export class RecipesPage implements OnInit{
	public searchinput: string;
	public recipesList: Recipe[];
	constructor(private recipes: RecipesService,private router: Router, private route: ActivatedRoute) { }
	async ngOnInit() {
		this.getList();
	}
	async ionChange(event) {
		this.recipesList = await this.recipes.list();
		console.log(await this.recipes.list());
	}
	async getList(){
		this.recipesList = await this.recipes.list();
		console.log(this.recipesList);
	}
	getDetail(id: number): void{
		console.log(id);
		this.router.navigateByUrl(`/recipes/${id}`);
	}
}
