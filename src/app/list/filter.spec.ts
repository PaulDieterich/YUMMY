import {Filter, FilterType} from './filter.class';
import {RecipeAttribute} from '../recipes/recipe.class';

describe('Filter', () => {
  it('should create an instance', () => {
    expect(new Filter<RecipeAttribute>(RecipeAttribute.id, FilterType.equals, 1)).toBeTruthy();
  });
});
