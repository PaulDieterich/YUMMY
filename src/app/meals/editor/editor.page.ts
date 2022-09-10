import {Component, OnInit} from '@angular/core';

import {Meal} from '../meal.class';

import {MealsService} from '../meals.service';
import {ActivatedRoute} from '@angular/router';

import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';

import {Recipe} from '../../recipes/recipe.class';

@Component({
	selector: 'app-editor',
	templateUrl: './editor.page.html',
	styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit {

	meal = new Meal();

	constructor(private service: MealsService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			this.service.get(+params.get('id')).subscribe(data => {
				this.meal.apply(data);
			});
		});
	}

	async takePicture(){
		const capturedPhoto = await Camera.getPhoto({
			quality: 100,
			resultType: CameraResultType.Base64,
			source: CameraSource.Camera
		});

		const base64 = 'data:image/png;base64,' + capturedPhoto.base64String;
		this.meal.images.push(base64);
	}

	addRecipe()	{
		// Show recipe selection dialog
		this.meal.recipes.push(new Recipe());
	}

	removeRecipe(recipe: Recipe) {
		const index = this.meal.recipes.indexOf(recipe);
		if (index > -1) {
			this.meal.recipes.splice(index, 1);
		}
	}

	save() {
		if (!this.meal.id) {
			this.service.create(this.meal).subscribe(data => {
				this.meal.apply(data);
			});
		} else {
			this.service.update(this.meal).subscribe(data => {
				this.meal.apply(data);
			});
		}
	}
}
