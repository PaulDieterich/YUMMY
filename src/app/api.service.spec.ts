import { TestBed } from '@angular/core/testing';

import { Service } from './api.service';
import {Recipe, RecipeAttribute} from './recipes/recipe.class';
import {RecipesService} from './recipes/recipes.service';

describe('Service', () => {
  let service: Service<Recipe, RecipeAttribute>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
