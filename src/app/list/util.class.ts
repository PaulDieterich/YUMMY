export class Filter<T> {

	public attribute: T;
	public filter: FilterType;
	public value: any;

	constructor(attribute?: T, filter?: FilterType, value?: any) {
		this.attribute = attribute;
		this.filter = filter;
		this.value = value;
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

export class Sorter<T> {

	public attribute: T;
	public direction: SortDirection;

	constructor(attribute?: T, direction?: SortDirection) {
		this.attribute = attribute;
		this.direction = direction;
	}

	toString(): string {
		return this.direction + this.attribute;
	}
}

export enum SortDirection {
	asc = '',
	desc = '-'
}

export class Pagination {

	public limit?: number;
	public afterId?: number;
	public offset?: number;
	public page?: number;

	toString(): string {
		let result = '';
		if (this.limit) {
			result += `&limit=${this.limit}`;
		}
		if (this.afterId) {
			result += `&after_id=${this.afterId}`;
		}
		if (this.offset) {
			result += `&offset=${this.offset}`;
		}
		if (this.page) {
			result += `&page=${this.page}`;
		}

		if (result.length > 0) {
			result = result.substring(1);
		}

		return result;
	}
}
