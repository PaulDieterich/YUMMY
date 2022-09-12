import { RecipesService } from './../../../recipes/recipes.service';
import { Component, OnInit, OnChanges, EventEmitter, Output } from '@angular/core';
import { Filter, FilterType } from 'src/app/common/list.class';
import { Recipe, RecipeAttribute } from './../../../recipes/recipe.class';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.scss'],
})
export class RecipeSearchComponent implements OnInit, OnChanges {
  @Output() addRecipeEvent = new EventEmitter<Recipe>();
  mSearch: string;
  recipes = new Array<Recipe>();
  constructor(private service: RecipesService,private modalCtrl: ModalController) { }

  ngOnInit() {
    this.ngOnChanges();
  }

  ngOnChanges(){
    if (this.mSearch && this.mSearch.length > 0) {
			console.log('Searching for ' + this.mSearch);
			const filter = new Array<Filter<RecipeAttribute>>();
			filter.push(new Filter<RecipeAttribute>(RecipeAttribute.name, FilterType.contains, this.mSearch));
			filter.push(new Filter<RecipeAttribute>(RecipeAttribute.tags, FilterType.contains, this.mSearch));

			this.service.list(filter).subscribe((data: Recipe[]) => {
				this.recipes = data;
			});
		} else {
			console.log('Loading all recipes');
			this.service.list().subscribe((data: Recipe[]) => {
				this.recipes = data;
				console.log(`image array: ${data[0].images}`);
			});
		}
	}
  addRecipe(recipe: Recipe){
    this.addRecipeEvent.emit(recipe);
    return this.modalCtrl.dismiss();
  }

}
