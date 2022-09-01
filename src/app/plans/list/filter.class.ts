import {FilterType} from '../../filter-type';

export class PlanFilter {

	private attribute: PlanAttribute;
	private filter: FilterType;
	private value: string;


	constructor(attribute: PlanAttribute, filter: FilterType, value: string) {
		this.attribute = attribute;
		this.filter = filter;
		this.value = value;
	}


	getAttribute(): PlanAttribute {
		return this.attribute;
	}

	getFilter(): FilterType {
		return this.filter;
	}

	getValue(): string {
		return this.value;
	}
}

export enum PlanAttribute {
	id = 'id',
	name = 'name',
	user = 'user'
}


