export class User {

	public username: string;
	public password: string;

	constructor() {
		this.username = '';
		this.password = '';
	}

	public apply(user: User) {
		this.username = user.username;
		this.password = user.password;
	}
}
