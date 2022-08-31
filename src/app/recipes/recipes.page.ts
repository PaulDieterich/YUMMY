import {Component} from '@angular/core';

@Component({
	selector: 'app-recipes',
	templateUrl: 'recipes.page.html',
	styleUrls: ['recipes.page.scss']
})
export class RecipesPage {

	constructor() {
	}

	recipes: any[] = [
		{
			'name': 'spagetti',
			'bewertung': '4/5',
			'aufwand': 'einfach',
			'zeit': '20min'

		},
		{
			'name': 'spagetti',
			'bewertung': '4/5',
			'aufwand': 'einfach',
			'zeit': '20min'

		}, {
			'name': 'spagetti',
			'bewertung': '4/5',
			'aufwand': 'einfach',
			'zeit': '20min'

		}, {
			'name': 'spagetti',
			'bewertung': '4/5',
			'aufwand': 'einfach',
			'zeit': '20min'

		},
		{
			'name': 'spagetti',
			'bewertung': '4/5',
			'aufwand': 'einfach',
			'zeit': '20min'

		}, {
			'name': 'spagetti',
			'bewertung': '4/5',
			'aufwand': 'einfach',
			'zeit': '20min'

		}
	]
}
