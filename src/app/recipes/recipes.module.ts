import {NgModule} from '@angular/core';

import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {RecipesPageRoutingModule} from './recipes-routing.module';
import {MealsPageRoutingModule} from '../meals/meals-routing.module';

import {RecipesPage} from './recipes.page';

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		RecipesPageRoutingModule,
		MealsPageRoutingModule,
	],
	declarations: [
		RecipesPage
	]
})
export class RecipesPageModule {


}
