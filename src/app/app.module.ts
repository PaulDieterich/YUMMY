import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';

import {PlanService} from './plans/plan.service';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ServiceWorkerModule.register('ngsw-worker.js', {
		enabled: environment.production,
		// Register the ServiceWorker as soon as the application is stable
		// or after 30 seconds (whichever comes first).
		registrationStrategy: 'registerWhenStable:30000'
	})],
	providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, PlanService],
	bootstrap: [AppComponent],
})
export class AppModule {
}
