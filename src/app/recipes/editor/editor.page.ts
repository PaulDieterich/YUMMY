import {Component, OnInit} from '@angular/core';
import { Ingredient } from '../ingredient.class';
import { Recipe } from '../recipe.class';
import { RecipesService } from '../recipes.service';

import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
@Component({
	selector: 'app-editor',
	templateUrl: './editor.page.html',
	styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit {

	inputStep = '';
	inputIngredient: Ingredient = new Ingredient();
	deleteIngredients: Ingredient;
	recipe: Recipe = new Recipe();
	dummyRecipe: Recipe = new Recipe();
	nudeln: Ingredient = new Ingredient();
	paprikla: Ingredient = new Ingredient();

	constructor(private recipes: RecipesService) {
	}

	ngOnInit() {
		this.dummyData();
	}
	save(){ console.log('save');}
	dismiss(){ console.log('dismiss');}
	newIngredient(){ console.log('newIngredient');
		this.dummyRecipe.ingredients.push(this.inputIngredient);
	}
	newStep(){
		this.dummyRecipe.instructions.push(this.inputStep);
		this.inputStep = '';
		console.log(`newStep: ${this.inputStep}`);
	}
	deleteInstuction(id: number){
		const instrcutions = this.dummyRecipe.instructions;
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
		this.dummyRecipe.images.push('../../../assets/shapes.svg');
	}

	//TODO: camera functions maybe outsource in service ?
	async takePicture(){
		const capturedPhoto = await Camera.getPhoto({
			quality: 100,
			resultType: CameraResultType.Base64,
			source: CameraSource.Camera
		});

		const base64 = 'data:image/png;base64,' + capturedPhoto.base64String;
		this.dummyRecipe.images.push(base64);
		console.log('Added image', base64);
	}
}




