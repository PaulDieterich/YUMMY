import { RecipeSearchComponent } from './recipe-search.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgModule,
    IonicModule
  ],
  declarations: [RecipeSearchComponent],
})
export class RecipeSearchComponentModule {}
