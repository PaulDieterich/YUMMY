import { Recipe } from './../recipe.class';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  newRecipe ={
  name: '',
  image: '',
  preperationTime: '',
  cookingTime: ''
  };
 recipe: Recipe;
  constructor(private recipes: RecipesService) { }

  ngOnInit() {
  }
  async addPicture(){
  //TODO: camera functions maybe outsource in service ?
		const capturedPhoto = await Camera.getPhoto({
			quality: 100,
			resultType: CameraResultType.Base64,
			source: CameraSource.Camera
		});
		//TODO: replase dummyRecipe
		this.newRecipe.image = 'data:image/png/base64,' +capturedPhoto.base64String;
		console.log(this.newRecipe.image);
	}
  safeNewRecipe(){
    this.recipe.setName(this.newRecipe.name);
    this.recipe.setImage(this.newRecipe.image);
    this.recipe.setPreparationTime(this.newRecipe.preperationTime);
    this.recipe.setCookingTime(this.newRecipe.cookingTime);
    this.recipes.create(this.recipe);
    console.log(`new Recipe ${this.recipe.getName()} was creaded`);
  }
}
