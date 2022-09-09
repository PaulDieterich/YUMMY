import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {EditorPage} from './editor.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule
	],
	declarations: [EditorPage]
})
export class EditorPageModule {
}
