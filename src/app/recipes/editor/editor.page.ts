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


	@Input() inputrecipe: Recipe = new Recipe();
	@Input() data: Ingredient = new Ingredient();
	inputStep = '';
	inputIngredients = new Array<Ingredient>();
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
		if(this.id > 0){
			this.recipes.get(this.id).subscribe(recipe => {
				this.recipe = recipe;
				console.log('ngOnInit', this.recipe);
			});
		}
	}
	newIngredient(){
		console.log('newIngredient');
		this.inputIngredients.push(this.data);
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
		this.recipe.ingredients.push(...this.inputIngredients);
		console.log(`${this.recipe.name} got updated`);
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
