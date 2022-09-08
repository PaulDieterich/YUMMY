import { Ingredient } from './../../ingredient.class';
import { Component, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss'],
})
export class IngredientListComponent implements OnInit {

  @Input() ingredient: Ingredient;
  @Output() deleteIngredients: Ingredient;
  constructor() { }

  ngOnInit() {
    console.log(this.ingredient.getName());
  }
  deleteItem(ingr: Ingredient){
    this.deleteIngredients = ingr;
    console.log(`delete ${ingr.getName()}`);
  }
}
