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
	dummyRecipe: Recipe = new Recipe();
	nudeln: Ingredient = new Ingredient();
	paprikla: Ingredient = new Ingredient();
	constructor(private recipes: RecipesService) {
	}

	ngOnInit() {
		this.dummyData();
		console.log('ngOnInit');
		this.recipes.get(1).subscribe(recipe => {
			this.recipe = recipe;
			console.log('ngOnInit', this.recipe);
		});
	}
	editRecipe(){
		console.log('edit recipe');
	}
	dummyData(){
		this.nudeln.amount = 500;
		this.nudeln.name = 'Nudeln';
		this.nudeln.unit = 'g';
		this.paprikla.amount = 3;
		this.paprikla.name = 'paprikla';
		this.paprikla.unit = 'stück';
		this.dummyRecipe.name = 'nudelsalat';
		this.dummyRecipe.instructions.push('koch nudeln');
		this.dummyRecipe.instructions.push('alles klein schneiden');
		this.dummyRecipe.ingredients.push(this.nudeln);
		this.dummyRecipe.ingredients.push(this.paprikla);
		this.dummyRecipe.time = '20min';
	}
}



