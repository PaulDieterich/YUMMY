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

	isModalOpen = false;
	meal = new Meal();
	constructor(private service: MealsService, private route: ActivatedRoute) {
		this.service.auth('user','user');
	 }

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			const id = +params.get('id');
			if (id > 0) {
				this.service.get(id).subscribe(data => {
					this.meal = data;
				});
			}
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
	setOpen(isOpen: boolean){
		this.isModalOpen = isOpen;
	}
	addRecipe(newRecipe: Recipe) {
		// Show recipe selection dialog
		console.log(newRecipe);
		this.meal.recipes.push(newRecipe);
		console.log(this.meal.recipes);
	}

	removeRecipe(recipe: Recipe) {
		const index = this.meal.recipes.indexOf(recipe);
		if (index > -1) {
			this.meal.recipes.splice(index, 1);
		}
	}
	delete(){
		this.service.delete(this.meal).subscribe(_ => {
		});
	}
	save() {
		if (this.meal.id > 0) {
			this.service.update(this.meal).subscribe(data => {
				this.meal.apply(data);
			});
		} else {
			this.meal.user = 'user';
			this.service.create(this.meal).subscribe(data => {
				this.meal.apply(data);
			});
		}
	}
}
