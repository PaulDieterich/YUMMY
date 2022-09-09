import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
export class EditorPage implements OnInit,OnChanges {

	@Input() recipe: Recipe = new Recipe();
	ingredient: Ingredient = new Ingredient();
	inputStep = '';
	deleteIngredients: Ingredient;
	id: number;
	constructor(private recipes: RecipesService,private activatedRoute: ActivatedRoute) {
	recipes.auth('user','user');
	}
	ngOnInit() {
		this.ngOnChanges();
	}
	ngOnChanges() {
		this.id = this.activatedRoute.snapshot.params.id;
		if(this.id > 0){
			this.recipes.get(this.id).subscribe(recipe => {
				this.recipe = recipe;
				console.log('ngOnInit', this.recipe);
			});
		}
	}
	/*
	newIngredient(newId: number){
		console.log('newIngredient');
		this.recipe.ingredients.set(newId, this.ingredient);
	}

	newStep(newStep: number){
		this.recipe.instructions.set(newStep,this.inputStep);
		console.log(`newStep: ${this.inputStep}`);
	}
	*/
	deleteIngredient(id: number){
		console.log(`deleteIngredient: ${id}`);
		this.recipe.ingredients.delete(id);
	}
	deleteInstuction(id: number){
		console.log(`deleteInstuction: ${id}`);
		this.recipe.instructions.delete(id);
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
	getIngreadntValues(): Array<Ingredient>{
		return Array.from(this.recipe.ingredients.values());
	}
	getInstructionsValues(): Array<string>{
		return Array.from(this.recipe.instructions.values());
	}
	updateRecipe(){
		//this.recipe.ingredients.push(...this.inputIngredients);
		console.log(`${this.recipe.name} got updated`);
		this.recipe.source = 'user';
		if(this.id > 0){
			this.recipes.update(this.recipe).subscribe(recipe =>{
				this.recipe = recipe;
			});
		}else{
			this.recipes.create(this.recipe).subscribe(recipe =>{
				this.recipe = recipe;
			});
		}
	}
}
