import {NgModule} from '@angular/core';

import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MealsPageRoutingModule} from './meals-routing.module';

import {MealsPage} from './meals.page';

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		MealsPageRoutingModule
	],
	declarations: [MealsPage]
})
export class MealsPageModule {
}
