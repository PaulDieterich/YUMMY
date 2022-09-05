import { Ingredient } from './../ingredient.class';
import { Recipe } from './../recipe.class';
import {Component, OnInit} from '@angular/core';
import { RecipesService } from '../recipes.service';
import { Observable } from 'rxjs';

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
		this.recipes.get(1).then(recipe =>{
			this.recipe = recipe;
			console.log(`recipe ${recipe}`);
		});
	}
	editRecipe(){
		console.log('edit recipe');
	}
	dummyData(){
		this.nudeln.setAmount(500);
		this.nudeln.setName('Nudeln');
		this.nudeln.setUnit('g');
		this.paprikla.setAmount(3);
		this.paprikla.setName('paprikla');
		this.paprikla.setUnit('stück');
		this.dummyRecipe.setId(99);
		this.dummyRecipe.setName('nudelsalat');
		this.dummyRecipe.setInstructions(['koch nudeln', 'alles klein schneiden']);
		this.dummyRecipe.setIngredients([this.nudeln,this.paprikla]);
		this.dummyRecipe.setPreparationTime('20min');
		this.dummyRecipe.setCookingTime('20min');
	}
}



