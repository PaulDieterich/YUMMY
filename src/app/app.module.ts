import { IngredientListComponent } from './recipes/editor/ingredient-list/ingredient-list.component';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';

import {RecipesService} from './recipes/recipes.service';
import {MealsService} from './meals/meals.service';
import {PlanService} from './plans/plan.service';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ServiceWorkerModule.register('ngsw-worker.js', {
		enabled: environment.production,
		// Register the ServiceWorker as soon as the application is stable
		// or after 30 seconds (whichever comes first).
		registrationStrategy: 'registerWhenStable:30000'
	}),FontAwesomeModule],
	providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, RecipesService, MealsService, PlanService],
	bootstrap: [AppComponent],
})
export class AppModule {
}
