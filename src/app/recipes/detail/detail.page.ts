import { ActivatedRoute } from '@angular/router';
import { Ingredient } from '../ingredient.class';
import { Recipe } from '../recipe.class';
import {Component, OnInit} from '@angular/core';
import { RecipesService } from '../recipes.service';

@Component({
	selector: 'app-detail',
	templateUrl: './detail.page.html',
	styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
	recipe: Recipe = new Recipe();
	id: number;
	constructor(private recipes: RecipesService,private activatedRoute: ActivatedRoute) {
	}

	ngOnInit() {
		this.id = this.activatedRoute.snapshot.params.id;
		console.log(`recepie id: ${this.id}`);
		this.recipes.get(this.id).subscribe(recipe => {
			this.recipe = recipe;
			console.log('ngOnInit', this.recipe);
		});
	}
	editRecipe(id: number){
		console.log('edit recipe');
	}
	getIngreadntValues(): Array<Ingredient>{
		return Array.from(this.recipe.ingredients.values());
	}
	getInstructionsValues(): Array<string>{
		return Array.from(this.recipe.instructions.values());
	}
}



