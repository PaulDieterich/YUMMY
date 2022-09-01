export class Sorter<T> {

	private attribute: T;
	private direction: SortDirection;

	constructor(attribute: T, direction: SortDirection) {
		this.attribute = attribute;
		this.direction = direction;
	}

	getAttribute(): T {
		return this.attribute;
	}

	setAttribute(value: T) {
		this.attribute = value;
	}

	getDirection(): SortDirection {
		return this.direction;
	}

	setDirection(value: SortDirection) {
		this.direction = value;
	}

	toString(): string {
		return this.direction + this.attribute;
	}
}

export enum SortDirection {
	asc = '',
	desc = '-'
}
