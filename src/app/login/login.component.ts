import {UserService} from './user.service';
import {Component, OnInit} from '@angular/core';
import {User} from './user.class';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	user: User = new User();
	error: string;
	loggedIn = false;

	constructor(private userService: UserService) {
		userService.auth('user', 'user');
	}

	ngOnInit() {
	}

	register() {
		if (this.user.username && this.user.username.trim().length > 0 && this.user.password && this.user.password.trim().length > 0) {
			this.userService.list().subscribe(data => {
				data.forEach(user => {
					if (this.user.username === user.username) {
						this.error = 'Username already exists';
						return;
					}
				});

				this.userService.create(this.user).subscribe(user => {
					this.user = user;
					this.loggedIn = true;
					localStorage.setItem('user', JSON.stringify(this.user));
				});
			});
		} else {
			this.error = 'Bitte geben Sie einen Benutzernamen und ein Passwort ein';
		}
	}

	logIn() {
		if (this.user.username && this.user.username.length > 0 && this.user.password && this.user.password.length > 0) {
			this.userService.get().subscribe(user => {
				this.user = user;
				this.loggedIn = true;
				localStorage.setItem('user', JSON.stringify(this.user));
			}, error => {
				this.error = 'Benutzername oder Passwort falsch';
				this.loggedIn = false;
				localStorage.setItem('user', null);
			});
		} else {
			this.error = 'Bitte geben Sie einen Benutzernamen und ein Passwort ein';
		}
	}

	logOut() {
		this.user = new User();
		this.loggedIn = false;
		localStorage.setItem('user', null);
	}
}
