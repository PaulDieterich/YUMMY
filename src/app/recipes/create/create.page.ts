import {Recipe} from '../recipe.class';
import {Component, OnInit} from '@angular/core';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {RecipesService} from '../recipes.service';

@Component({
	selector: 'app-create',
	templateUrl: './create.page.html',
	styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

	public recipe: Recipe;

	constructor(private recipes: RecipesService) {
		this.recipe = new Recipe();
	}

	ngOnInit() {

	}

	async addPicture() {
		//TODO: camera functions maybe outsource in service ?
		const capturedPhoto = await Camera.getPhoto({
			quality: 100,
			resultType: CameraResultType.Base64,
			source: CameraSource.Camera
		});

		const base64 = 'data:image/png;base64,' + capturedPhoto.base64String;
		this.recipe.images.push(base64);
		console.log('Added image', base64);
	}

	saveRecipe() {
		this.recipes.create(this.recipe);
		console.log('Saved recipe', this.recipe);
	}
}
