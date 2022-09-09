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
	recipe: Recipe = new Recipe();
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
				this.inputrecipe = recipe;
				console.log('ngOnInit', this.inputrecipe);
			});
		}
	}
	newIngredient(){
	}

	newStep(){
		const inputStep = '';
		//this.recipe.instructions.push(inputStep);
	}
	deleteIngredient(id: number){
		const todelete = this.inputrecipe.ingredients.splice(id,1);
		console.log(`delete ${todelete}`);
	}
	deleteInstuction(id: number){
		const instrcutions = this.inputrecipe.instructions.splice(id,1);
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
		console.log(`${this.inputrecipe.name} got updated`);
		if(this.id > 0){
			this.recipes.update(this.inputrecipe).subscribe(recipe =>{
			});
		}else{
			this.recipes.create(this.inputrecipe).subscribe(recipe =>{
			});
		}
	}
}
