import {TestBed} from '@angular/core/testing';

import {RecipesService} from './recipes.service';

describe('RecipesService', () => {
	let service: RecipesService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(RecipesService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should work properly', async () => {
		const result = await service.list();
		console.log(result);
		expect(result).toBeTruthy();
	});
});
