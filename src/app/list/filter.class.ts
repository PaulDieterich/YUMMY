export class Filter<T> {

	private readonly attribute: T;
	private readonly filter: FilterType;
	private readonly value: any;

	constructor(attribute: T, filter: FilterType, value: any) {
		this.attribute = attribute;
		this.filter = filter;
		this.value = value;
	}

	getAttribute(): T {
		return this.attribute;
	}

	getFilter(): FilterType {
		return this.filter;
	}

	getValue(): string {
		return this.value;
	}
}

export enum FilterType {
	equals = 'eq',
	notEquals = 'neq',
	contains = 'in',
	notContains = 'notin',
	regex = 'rx',
	lowerThan = 'lt',
	lowerThanOrEquals = 'lte',
	greaterThan = 'gt',
	greaterThanOrEquals = 'gte'
}

