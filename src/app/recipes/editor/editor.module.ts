import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {EditorPageRoutingModule} from './editor-routing.module';
import {EditorPage} from './editor.page';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { LoginComponent } from 'src/app/login/login.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		EditorPageRoutingModule,
	],
	declarations: [EditorPage]
})
export class EditorPageModule {
}
