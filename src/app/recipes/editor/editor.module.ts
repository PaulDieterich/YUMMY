import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {EditorPageRoutingModule} from './editor-routing.module';
import {EditorPage} from './editor.page';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		EditorPageRoutingModule,
	],
	declarations: [EditorPage,
		IngredientListComponent]
})
export class EditorPageModule {
}
