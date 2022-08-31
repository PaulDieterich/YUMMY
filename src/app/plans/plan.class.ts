export class Plan {

	private id: number;
	private name: string;
	private user: string;

	constructor() {
		this.id = -1;
		this.name = '';
		this.user = '';
	}


	getId(): number {
		return this.id;
	}

	setId(value: number) {
		this.id = value;
	}

	getName(): string {
		return this.name;
	}

	setName(value: string) {
		this.name = value;
	}

	getUser(): string {
		return this.user;
	}

	setUser(value: string) {
		this.user = value;
	}
}
