import {Component, OnInit} from '@angular/core';
import { Ingredient } from '../ingredient.class';
import { Recipe } from '../recipe.class';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute } from '@angular/router';
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
	id: number;
	constructor(private recipes: RecipesService,private activatedRoute: ActivatedRoute) {
	}

	ngOnInit() {
		this.id = this.activatedRoute.snapshot.params.id;
		this.recipes.get(this.id).subscribe(recipe => {
			this.recipe = recipe;
			console.log('ngOnInit', this.recipe);
		});
	}
	save(){ console.log('save');}
	dismiss(){ console.log('dismiss');}
	newIngredient(){ console.log('newIngredient');
		this.recipe.ingredients.push(this.inputIngredient);

	}

	newStep(){
		this.recipe.instructions.push(this.inputStep);
		this.inputStep = '';
		console.log(`newStep: ${this.inputStep}`);
	}
	deleteInstuction(id: number){
		const instrcutions = this.recipe.instructions;
	}

	//TODO: camera functions maybe outsource in service ?
	async takePicture(){
		const capturedPhoto = await Camera.getPhoto({
			quality: 100,
			resultType: CameraResultType.Base64,
			source: CameraSource.Camera
		});

		const base64 = 'data:image/png;base64,' + capturedPhoto.base64String;
		this.recipe.images.push(base64);
		console.log('Added image', base64);
	}
	updateRecipe(){
		console.log(`${this.recipe} got updated`);
		this.recipes.update(this.recipe);
	}
	deleteItem(ingr: Ingredient){
		this.deleteIngredients = ingr;
		console.log(`delete ${ingr.name}`);
	  }
}




