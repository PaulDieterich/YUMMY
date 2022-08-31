import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MealsPage} from './meals.page';
import {ExploreContainerComponentModule} from '../explore-container/explore-container.module';
import {MealsPageRoutingModule} from './meals-routing.module';

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		ExploreContainerComponentModule,
		MealsPageRoutingModule
	],
	declarations: [MealsPage]
})
export class MealsPageModule {
}
