import {FilterType, PlanAttribute, PlanFilter} from './filter.class';

describe('Filter', () => {
	it('should create an instance', () => {
		expect(new PlanFilter(PlanAttribute.id, FilterType.equals, 'value')).toBeTruthy();
	});
});
