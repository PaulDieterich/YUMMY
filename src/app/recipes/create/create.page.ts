import {Recipe} from '../recipe.class';
import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {RecipesService} from '../recipes.service';
import { ActivatedRoute } from '@angular/router';
import { Ingredient } from '../ingredient.class';

@Component({
	selector: 'app-create',
	templateUrl: './create.page.html',
	styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit, OnChanges {

	@Input() inputrecipe: Recipe = new Recipe();
	@Input() data: Ingredient = new Ingredient();
	inputStep = '';
	inputIngredient: Ingredient = new Ingredient();
	deleteIngredients: Ingredient;
	recipe: Recipe = new Recipe();
	id: number;
	constructor(private recipes: RecipesService,private activatedRoute: ActivatedRoute) {
	}


	ngOnInit() {
		this.ngOnChanges();
	}
	ngOnChanges() {
		this.id = this.activatedRoute.snapshot.params.id;
		this.recipes.get(this.id).subscribe(recipe => {
			this.recipe = recipe;
			console.log('ngOnChanges', this.recipe);
		});
	}
	newIngredient(){ console.log('newIngredient');
		this.recipe.ingredients.push(this.inputIngredient);

	}

	newStep(){
		this.recipe.instructions.push(this.inputStep);
		this.inputStep = '';
		console.log(`newStep: ${this.inputStep}`);
	}
	deleteIngredient(name: string){
		const todelete = this.recipe.ingredients.filter(ingredient => ingredient.name !== name);
		console.log(`delete ${todelete}`);
	}
	deleteInstuction(id: number){
		console.log("delete instruction");
		//const instrcutions = this.recipe.instructions;
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
		console.log(`${this.recipe.name} got updated`);
		this.recipes.update(this.recipe).subscribe(recipe =>{
			this.recipe = recipe;
		});
	}
	deleteItem(ingr: Ingredient){
		this.deleteIngredients = ingr;
		console.log(`delete ${ingr.name}`);
	  }
}






