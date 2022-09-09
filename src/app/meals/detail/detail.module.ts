import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {AppRoutingModule} from '../../app-routing.module';

import {DetailPage} from './detail.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		AppRoutingModule
	],
	declarations: [DetailPage]
})
export class DetailPageModule {
}
