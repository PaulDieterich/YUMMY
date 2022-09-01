export class Ingredient {

	private name: string;
	private amount: number;
	private unit: string;

	constructor() {
		this.name = '';
		this.amount = 0;
		this.unit = '';
	}

	getName(): string {
		return this.name;
	}

	setName(name: string): void {
		this.name = name;
	}

	getAmount(): number {
		return this.amount;
	}

	setAmount(amount: number): void {
		this.amount = amount;
	}

	getUnit(): string {
		return this.unit;
	}

	setUnit(unit: string): void {
		this.unit = unit;
	}
}
