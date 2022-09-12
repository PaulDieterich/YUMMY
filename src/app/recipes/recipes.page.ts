import {Component, OnChanges, OnInit} from '@angular/core';

import {Recipe, RecipeAttribute} from './recipe.class';
import {RecipesService} from './recipes.service';
import {Filter, FilterType} from '../common/list.class';

@Component({
	selector: 'app-recipes',
	templateUrl: 'recipes.page.html',
	styleUrls: ['recipes.page.scss']
})
export class RecipesPage implements OnInit, OnChanges {
	public mSearch: string;
	loggedIn = false;
	public recipes = new Array<Recipe>();
	newId: number;
	isModalOpen = false;
	constructor(private service: RecipesService) { }

	ngOnInit() {
		this.ngOnChanges();
	}

	ngOnChanges() {
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
	input(login: boolean){
		this.loggedIn = login;
		console.log(`input: ${this.loggedIn}`);
	}
	setOpen(isOpen: boolean){
		if(!this.loggedIn){
			this.isModalOpen = isOpen;
		}else{
			this.loggedIn = false;
			localStorage.removeItem('user');
		}
	}
}
