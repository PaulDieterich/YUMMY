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

	steps: string[] = [];
	data: Ingredient = new Ingredient();
	recipe: Recipe = new Recipe();
	id: number;
	constructor(private recipes: RecipesService,private activatedRoute: ActivatedRoute) {
		recipes.auth('user','user');
	}
	ngOnInit() {
		this.ngOnChanges();
		/*this.id = this.activatedRoute.snapshot.params.id;
		if(this.id > 0){
			this.recipes.get(this.id).subscribe(recipe => {
				this.recipe = recipe;
				console.log('ngOnInit', this.recipe);
			});
		}*/
	}
	ngOnChanges() {
		this.id = this.activatedRoute.snapshot.params.id;
		if(this.id > 0){
			this.recipes.get(this.id).subscribe(recipe => {
				this.recipe = recipe;
				this.steps = this.recipe.instructions;
				console.log('ngOnInit', this.recipe);
			});
		}
	}
	newIngredient(){
		const inputIngredient = new Ingredient();
		this.recipe.ingredients.push(inputIngredient);
	}

	newStep(){
		const inputStep = '';
		this.recipe.instructions.push(inputStep);
	}
	deleteIngredient(id: number){
		const todelete = this.recipe.ingredients.splice(id,1);
		console.log(`delete ${todelete}`);
	}
	deleteInstuction(id: number){
		const instrcutions = this.recipe.instructions.splice(id,1);
	}
	index(): number[]{
		return Array.from(Array(this.steps.length).keys());
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
		const u = JSON.parse(localStorage.getItem('user'));
		this.recipe.source = u.username;
		console.log(`${this.recipe.name} got updated`);
		this.recipe.ingredients.forEach(element => {
			if(element.amount < 1){
				element.amount = 1;
			}
		});
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
	deleteRecipe(){
		this.recipes.delete(this.id).subscribe(_ =>{
				console.log('deleted');
		});
	}
}
