import {UserService} from './user.service';
import {Component, Input, OnInit, Output,EventEmitter} from '@angular/core';
import {User} from './user.class';

import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	@Output() logging = new EventEmitter<boolean>();
	user: User = new User();
	error: string;
	loggedIn = false;
	modal: ModalController;
	constructor(private userService: UserService,private modalCtrl: ModalController) {
		userService.auth('user', 'user');
	}

	ngOnInit() {
	}
	output(){
		this.logging.emit(this.loggedIn);
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
					this.loggedIn = true;
					console.log(this.user);
					localStorage.setItem('user', JSON.stringify(this.user));
					this.output();
					return this.modalCtrl.dismiss();
				});
			});
		} else {
			this.error = 'Bitte geben Sie einen Benutzernamen und ein Passwort ein';
		}
	}

	logIn() {
		console.log(this.user.username);
		if (this.user.username && this.user.username.length > 0 && this.user.password && this.user.password.length > 0) {
			this.userService.get().subscribe(user => {
				console.log(this.user);
				this.loggedIn = true;
				//this.user = user;
				localStorage.setItem('user', JSON.stringify(this.user));
				this.output();
				return this.modalCtrl.dismiss();
			}, error => {
				this.error = 'Benutzername oder Passwort falsch';
				this.loggedIn = false;
				localStorage.setItem('user', null);
			});
		} else {
			this.error = 'Bitte geben Sie einen Benutzernamen und ein Passwort ein';
		}
	}

}
