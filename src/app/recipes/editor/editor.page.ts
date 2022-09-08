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
		this.dummyRecipe.getIngredients().push(this.inputIngredient);
	}
	newStep(){
		this.dummyRecipe.getInstructions().push(this.inputStep);
		this.inputStep = '';
		console.log(`newStep: ${this.inputStep}`);
	}
	deleteInstuction(id: number){
		const instrcutions = this.dummyRecipe.getInstructions();
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
		this.dummyRecipe.setImage('../../../assets/shapes.svg');
	}



	//TODO: camera functions maybe outsource in service ?
	async takePicture(){
		const capturedPhoto = await Camera.getPhoto({
			quality: 100,
			resultType: CameraResultType.Base64,
			source: CameraSource.Camera
		});
		//TODO: replase dummyRecipe
		this.dummyRecipe.setImage('data:image/png/base64,' +capturedPhoto.base64String);
		console.log(this.dummyRecipe.getImage());
	}
}




