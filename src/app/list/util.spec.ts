import {Filter, FilterType, Pagination, SortDirection, Sorter} from './util.class';
import {RecipeAttribute} from '../recipes/recipe.class';

describe('Filter', () => {
	it('should create an instance', () => {
		expect(new Filter<RecipeAttribute>(RecipeAttribute.id, FilterType.equals, 1)).toBeTruthy();
	});
});

describe('Sorter', () => {
	it('should create an instance', () => {
		expect(new Sorter<RecipeAttribute>(RecipeAttribute.id, SortDirection.asc)).toBeTruthy();
	});
});

describe('Pagination', () => {
	it('should create an instance', () => {
		expect(new Pagination()).toBeTruthy();
	});
});
