import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ServiceWorkerModule} from '@angular/service-worker';

import {environment} from '../environments/environment';
import {RouteReuseStrategy} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {RecipesService} from './recipes/recipes.service';
import {MealsService} from './meals/meals.service';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, ServiceWorkerModule.register('ngsw-worker.js', {
		enabled: environment.production,
		// Register the ServiceWorker as soon as the application is stable
		// or after 30 seconds (whichever comes first).
		registrationStrategy: 'registerWhenStable:30000'
	})],
	providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, RecipesService, MealsService],
	bootstrap: [AppComponent],
})
export class AppModule {
}
