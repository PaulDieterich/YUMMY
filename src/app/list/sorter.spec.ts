import {SortDirection, Sorter} from './sorter.class';
import {RecipeAttribute} from '../recipes/recipe.class';

describe('Sorter', () => {
  it('should create an instance', () => {
    expect(new Sorter<RecipeAttribute>(RecipeAttribute.id, SortDirection.asc)).toBeTruthy();
  });
});
