import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RecipesPage} from './recipes.page';


import {RecipesPageRoutingModule} from './recipes-routing.module';

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		RecipesPageRoutingModule
	],
	declarations: [RecipesPage]
})
export class RecipesPageModule {


}
