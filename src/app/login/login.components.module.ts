import { LoginComponent } from './login.component';
import {NgModule} from '@angular/core';

import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
	],
	declarations: [LoginComponent]
})
export class LoginComponentModule {
}
