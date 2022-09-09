import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {DetailPage} from './detail.page';
import {RouterModule} from '@angular/router';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule
	],
	declarations: [DetailPage]
})
export class DetailPageModule {
}
